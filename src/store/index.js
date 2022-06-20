import { createStore } from "vuex";
import socket from "../socket";

const qttag = [{ title: "文字题", color: "#FFFF00", info: "仅会出现文字的Quiz" }, { title: "图片题", color: "#FFFF00", info: "围绕一张图片展开的Quiz" }, { title: "音频题", color: "#FFFF00", info: "围绕一段音乐或一个音效展开的Quiz" }];
const attag = [{ title: "抢答题", color: "#00FFFF", info: "本题是抢答题，仅第一名抢答成功并回答正确的玩家会得到分数。" }, { title: "自由答题", color: "#00FFFF", info: "本题是自由答题，无需抢答，可以随意提交答案，只要答对就能得分" }, { title: "问答题", color: "#00FFFF", info: "本题是问答题，无需抢答，所有回答正确的玩家都会得到分数" }, { title: "选择题", color: "#00FFFF", info: "本题为选择题，所有人都可以回答，选择正确选项（可能不唯一）的玩家将得到分数" }];
const sttag = [{ title: "10分题", color: "#00FF00", info: "回答正确的玩家将得到10分" }, { title: "20分题", color: "#0000FF", info: "回答正确的玩家将得到20分" }, { title: "30分题", color: "#FF00FF", info: "回答正确的玩家将得到30分" }, { title: "40分题", color: "#FF6600", info: "回答正确的玩家将得到40分" }, { title: "50分题", color: "#FF0000", info: "回答正确的玩家将得到50分" }]

const scolor = ["rgb(101, 214, 248)", "#03a9f4", "rgb(0, 255, 0)", "red", "yellow"];
const sanima = ["none", "state1 5s infinite linear", "state2 0.15s linear 3", "state3 0.2s linear 2", "state4 0.2s linear 2"]
export default createStore({
    state: {
        user: {
            uid: null,
            name: "",
            btn: "",
            type: -1 //-1未登录，1普通人，2内鬼，40管理员。
        },
        ready: false,//是否准备
        players: [],//房间里的正式玩家
        messages: [],//聊天栏的消息
        welcome_infos: [],//欢迎消息
        admin_msg: {}, //管理员的消息
        tags: [],//quiz的tag
        quiz: {},//题目基础信息
        btn: "",//抢答按钮状态
        anser: "",//回答者
        timers: [],//计时器
        options:[],
        ansOption:[],
        ans: "",//答案
        ansDetail: "",
        initing: true,//初始化中
        board: "",//自己答题板上的内容
        title: "",//题目的大标题
        isShowDown: false,//题目是否已展示完
        ansAdmin: "",//管理员提前得知的答案
        isAdmin: false,//是否是管理员
        light: { color: scolor[0], anima: sanima[0] },//答题板上灯条的状态
        imgShowSrc: "",//是否展示图片的大图
        musicGoon: false,//是否继续播放音乐
        playerNum:{player:0,all:0},
        quizNum:0,
        rankInfo:{title:"",rank:[]},
    },
    actions: {
        //dispatch
        setUser(context, user) {
            socket.emit("login", user, (ref, __user) => {
                if (ref < 100) {
                    let _user = JSON.parse(__user);
                    context.commit("SetUser", _user);

                }
                switch (ref) {
                    case 2:
                        alert("未能找到此uid，已跳转至内鬼登陆");
                        break;
                    case 3:
                        alert("此uid已有人登陆，已跳转至内鬼登陆。");
                        break;
                    case 4:
                        alert("房间玩家数超过最大限制，已跳转至观战视角。")
                    case 400:
                        alert("昵称不能超过20个字符");
                        break;
                    case 500:
                        alert("昵称不能为空");
                        break;
                }
            });
            return 1; // ok
        },//存自己的数据
        initData(context, data) {
            data.players.forEach((p) => {
                p.color = scolor[p.state];
                p.anima = sanima[p.state];
                p.result = 0;
            })
            context.commit("InitData", data);
        },//刚加入游戏，回显数据。
        addPlayer(context, p) {
            if (p.type == 1) {
                context.commit("AddWelcomeInfo", `[${p.uid}]${p.name}加入了房间`);
            }
            p.color = scolor[p.state];
            p.anima = sanima[p.state];
            p.result = 0;
            context.commit("AddPlayer", p);
        },//有人加入房间
        removePlayer(context, id) {
            context.state.players.forEach((p, index) => {
                if (p.id == id) context.commit("RemovePlayer", index);
            })
        },//有人离开房间
        sendMessage(context, msg) {
            if (msg.trim() == "") return;
            socket.emit("sendMessage", msg);
        },//自身发送消息
        addMessage(context, msg) {
            context.commit("AddMessage", msg);
            if (msg.type == 40) {
                context.commit("AddAdminMsg", msg);
            }
            if (msg.type == 1) {
                context.state.players.forEach((p) => {
                    if (p.uid == msg.uid) {
                        p.msg = msg.message;
                        if (p.msgTime) clearInterval(p.msgTime);
                        p.msgTime = setTimeout(() => {
                            p.msg = null;
                        }, 2500)
                    }
                })
            }
        },//有人发送消息
        popQuiz(context) {
            if (context.state.btn) {
                return;
            }
            socket.emit("popQuiz");
        },//自己按下抢答键。
        sendAns(context, ans) {
            if (ans.trim() == "") return;
            socket.emit("ReciveAns", ans.trim());
        },//提交答案。
        solveAnsResult(context, result) {
            if (context.state.anser == "ALL") {
                let _tot = 0;
                let _f = 0;
                for (let i = 0; i < result.length; i++) {
                    if (result[i].p) _tot++;
                    if (result[i].id == context.state.user.id) _f = result[i].p ? 1 : 2;
                }
                if (_f == 0) document.getElementsByName("middle")[0].play();
                if (_f == 1) document.getElementsByName("bingo")[0].play();
                if (_f == 2) document.getElementsByName("wrong")[0].play();
                let lines = "答题结束!本题共有" + _tot + "名选手回答正确，正确率为" + Math.round(_tot * 100 / this.state.players.length) + "%，他们都将获得" + context.state.quiz.score + "点分数!"
                context.commit("SetAdminBoard", lines);
            } else {
                if (result[0].p) {
                    document.getElementsByName("bingo")[0].play();
                    context.commit("SetAdminBoard", "回答正确!恭喜" + context.getters.getAnserName + "获得" + context.state.quiz.score + "点分数!")
                } else {
                    document.getElementsByName("wrong")[0].play();
                    context.commit("PopTimer", 1);
                    context.commit("ContinueTimer", 0);
                    context.commit("SetAdminBoard", "很遗憾!回答错误。")
                    context.commit("ClearPlayerBoard");
                    if (context.state.isShowDown) {
                        context.commit("SetTitle", "请抢答!")
                    } else {
                        context.commit("SetTitle", "请听题!")
                    }
                    setTimeout(() => {
                        context.commit("SetAdminBoard", "有没有人继续抢答呢？");
                    }, 1500);
                }
            }
        },//处理当前题目的解答结果。
        kickPlayer(context, id) {
            socket.emit("KickPlayer", id);
        },
        sendAnsCheck(context) {
            let _ansCheck = [];
            context.state.players.forEach((p) => {
                _ansCheck.push({ id: p.id, p: p.result == 1 ? true : false });
            })
            socket.emit("CheckAns", _ansCheck);
        },
    },
    mutations: {
        //commit
        SetUser(state, user) {
            state.user = user;
            if (user.type == 40) state.isAdmin = true;
        },//设置自己的数据
        AddPlayer(state, p) {
            state.players.push(p);
        },//有人加入房间
        RemovePlayer(state, index) {
            state.players.splice(index, 1);
        },//有人离开房间
        AddMessage(state, msg) {
            state.messages.push(msg);
        },//往消息栏添加一条消息
        AddAdminMsg(state, m) {
            state.admin_msg.msg = m.message;
            if (state.admin_msg.msgTime) clearInterval(state.admin_msg.msgTime);
            state.admin_msg.msgTime = setTimeout(() => {
                state.admin_msg.msg = null;
            }, 3000)
        },//添加一条管理员的消息
        InitData(state, data) {
            if (data.quiz) this.commit("SetQuizBaseInfo", data.quiz);
            for (let i = 0; i < data.players.length; i++)state.players.push(data.players[i]);
            if (data.state.showTime_used) {
                let _state = {
                    left: data.quiz.timeLimit_show - data.state.showTime_used,
                    goon: data.state.ansTime_used ? false : true
                }
                this.commit("SetTimer", { id: 0, ..._state });
            }
            if (data.state.ansTime_used) {
                let _state = {
                    left: data.quiz.timeLimit_ans - data.state.ansTime_used,
                }
                this.commit("SetTimer", { id: 1, ..._state });
            }
            state.anser = data.state.anser;
            if (data.state.ready) this.commit("Ready");
            if (state.anser != "") {
                this.commit("SetPop", 0);
                this.commit("SetBoardAns", data.state.playerAns);
            }
            document.getElementsByName("welcome")[0].play();
            setTimeout(() => {
                state.initing = false;
            }, 500);

        },//刚加入游戏，回显数据。
        AddWelcomeInfo(state, str) {
            state.welcome_infos.push(str);
            if (!state.initing) document.getElementsByName("welcome")[0].play();
            setTimeout(() => {
                state.welcome_infos.shift();
            }, 3000)
        },//添加一条欢迎消息
        InitQuizInfo(state) {
            while (state.timers.length) {
                state.timers[0].goon = false;
                state.timers.shift();
            }
            while (state.tags.length) {
                state.tags.pop();
            }
            state.ans = "";
            state.ansDetail = "";
            state.ansOption = [];
            state.anser = "";
            state.quiz.text = "";
            state.quiz.ans = "";
            state.musicGoon = false;
            state.options = [];
            if(state.isAdmin){
                state.players.forEach((p) => {
                    p.result = 0;
                })
            }
            this.commit("SetPop", 1);
        },//初始化看题版。
        SetQuizBaseInfo(state, q) {
            this.commit("InitQuizInfo");
            this.commit("SetTitle", "请听题");
            this.commit("SetAdminBoard", attag[q.ans_type].info);
            state.isShowDown = false;
            state.players.forEach((p) => { p.board = ""; p._board = "" });
            if (q.ans_type > 0) {
                state.anser = "ALL";
                this.commit("SetPop", 3);
            } else {
                this.commit("SetPop", 1);
            }
            state.quiz = q;
            if (!state.initing) document.getElementsByName("NewQuiz")[0].play();
            setTimeout(() => {
                state.tags.push({ ...qttag[q.quiz_type], type: 0 });
                state.tags.push({ ...attag[q.ans_type], type: 1 });
                state.tags.push({ ...sttag[q.score / 10 - 1], type: 2 });
            }, 0);
            if (q.quiz_type == 2) {
                setTimeout(() => {
                    document.getElementById("QuizMusic").src = this.getters.getMusicSrc;
                }, 100);
            }
        },//初始化新题目
        UpdataText(state, word) {
            state.quiz.text += word;
        },//更新题目
        SetAnser(state, id) {
            if (id != "ALL") {
                state.anser = id;
                this.commit("SetTitle", "请回答");
                document.getElementsByName("PopQuiz")[0].play();
                this.commit("SetTimer", { id: 1 });
                this.commit("StopTimer", 0);
                this.commit("SetMusicGoon", false);
                this.commit("SetAdminBoard", this.getters.getAnserName + "按下了抢答键!请回答!");
                if (id != state.user.id) {
                    this.commit("SetPop", 0);
                }
            } else {

            }
        },//设置当前答题者
        SetPop(state, id) {
            if (id == 0) {
                state.btn = "btn-cant";
            }
            if (id == 1) {
                state.btn = "";
            }
            if (id == 2) {
                state.btn = "btn-cold"
            }
            if (id == 3) {
                state.btn = "btn-noneed"
            }
        },//设置抢答键状态。
        SetBoardAns(state, ans) {
            console.log("reciveans", ans);
            if (state.quiz.ans_type == 0) {
                state.players.forEach((p) => {
                    if (p.id == ans.id) p.board = ans.ans;
                })
                this.commit("StopTimer", 1);
                this.commit("SetAdminBoard", this.getters.getAnserName + "给出了自己的答案!那么是否正确呢!")
                document.getElementsByName("UpdataAns")[0].play();
            } else {
                let _f = true;
                for (let i = 0; i < state.players.length; i++)
                    if (state.players[i].id == ans.id) {
                        if (state.players[i]._board != "") _f = false;
                        state.players[i]._board = ans.ans;
                    }
                if (_f) {
                    document.getElementsByName("UpdataAns")[0].play();
                    this.commit("SetAdminBoard", this.getters.getFullName(ans.id) + "已提交答案!")
                }

                if (state.isAdmin) {
                    state.players.forEach((p) => {
                        if (p.id == ans.id) p.board = ans.ans;
                        if (ans.ans.toUpperCase() == state.ansAdmin.toUpperCase()) {
                            this.commit("SetAnsCheckResult", { id: ans.id, result: 1 })
                        } else {
                            this.commit("SetAnsCheckResult", { id: ans.id, result: 2 })
                        }
                    })
                }
            }
        },//将答案显示到答题板上
        SetBoardAnsLast(state,ans){
            for (let i = 0; i < state.players.length; i++)
                if (state.players[i].id == ans.id) {
                    state.players[i]._board = ans.ans;
                }
            if (state.isAdmin) {
                state.players.forEach((p) => {
                    if (p.id == ans.id) p.board = ans.ans;
                    if (ans.ans.toUpperCase() == state.ansAdmin.toUpperCase()) {
                        this.commit("SetAnsCheckResult", { id: ans.id, result: 1 })
                    } else {
                        this.commit("SetAnsCheckResult", { id: ans.id, result: 2 })
                    }
                })
            }
        },
        ClearPlayerBoard(state) {
            state.players.forEach((p) => {
                p.board = "";
            })
        },
        SetTimer(state, timer) {
            let _timer = {
                tot: (timer.id ? state.quiz.timeLimit_ans : state.quiz.timeLimit_show),
                left: (timer.id ? state.quiz.timeLimit_ans : state.quiz.timeLimit_show),
                id: timer.id,
                goon: true
            }
            for (let i in timer)
                _timer[i] = timer[i];
            _timer.over = function () { };


            if (state.quiz.ans_type < 2) {
                if (!timer.id) {
                    _timer.over = function () {
                        document.getElementsByName("TimeUp")[0].play();
                    }
                    state.isShowDown = true;
                    document.getElementsByName("ansstart")[0].play();
                    if(state.quiz.ans_type==0)this.commit("SetAdminBoard", "抢答开始!");
                } else {
                    if (state.anser == state.user.id) {
                        _timer.over = function () {
                            socket.emit("ReciveAns", document.getElementsByName("AnsBoard")[0].innerText);
                        }
                    }
                }
            } else {
                document.getElementsByName("ansstart")[0].play();
                this.commit("SetAdminBoard", "答题开始!");
                _timer.over = () => {
                    document.getElementsByName("TimeUp")[0].play();
                    if (!state.isAdmin) socket.emit("ReciveAnsLast", document.getElementsByName("AnsBoard")[0].innerText);
                    this.commit("SetAdminBoard", "时间到!请打开答题板!");
                    setTimeout(() => {
                        state.players.forEach((p) => {
                            p.board = p._board;
                        })
                        this.commit("SetAdminBoard", "选手们的答案都展示出来了，那么结果会如何呢？");
                    }, 2500);
                };
            }

            state.timers.push(_timer);
        },//设置计时器 0showtimer 1anstimer
        UpdatePlayerState(state, ps) {
            ps.forEach((p) => {
                for (let i = 0; i < state.players.length; i++) {
                    if (state.players[i].id == p.id) {
                        state.players[i].state = p.state;
                        state.players[i].color = scolor[p.state];
                        state.players[i].anima = sanima[p.state];
                    }
                }
                if (p.id == state.user.id) {
                    state.light.color = scolor[p.state];
                    state.light.anima = sanima[p.state];
                }
            })
        },//更新玩家的答题栏状态。
        StopTimer(state, id) {
            state.timers.forEach((t) => {
                if (t.id == id) {
                    t.goon = false;
                }
            })
        },//停止计时器
        ContinueTimer(state, id) {
            state.timers.forEach((t) => {
                if (t.id == id) {
                    t.goon = true;
                }
            })
        },//继续计时器
        PopTimer(state, id) {
            for (let i = state.timers.length - 1; i >= 0; i--) {
                if (state.timers[i].id == id) state.timers.splice(i, 1);
            }
        },//将计时器清除
        SetAnswer(state, ans) {
            if (ans.id != state.quiz.id) return;
            state.ans = ans.ans;
            state.quiz.text = ans.text;
            state.ansDetail = ans.ansDetail;
            if(state.quiz.ans_type == 3){
                ans.options.forEach((option) => {
                    state.ansOption.push(option);
                })
            }
        },//设置答案
        SetTitle(state, str) {
            state.title = str;
        },//设置大标题
        SetAdminBoard(state, id) {
            if (state.boardTimer) clearInterval(state.boardTimer);
            state.board = "";
            let i = 0;
            state.boardTimer = setInterval(() => {
                if (i < id.length) state.board += id.charAt(i++);
                else {
                    clearInterval(state.boardTimer);
                    state.boardTimer = null;
                }
            }, 100);

        },//设置告示板
        SetAnsCheckResult(state, result) {
            state.players.forEach((p) => {
                if (p.id == result.id)
                    p.result = result.result;
            })
        },
        Ready(state) {
            state.ready = true;
            document.getElementsByName("TimeUp")[0].play();
            this.commit("SetAdminBoard", "请注意了!游戏即将开始!");
        },
        SetQuizAnsAdmin(state, ans) {
            state.ansAdmin = ans;
        },
        SolveAllPlayerAnsDown(state) {
            this.commit("StopTimer", 0);
            document.getElementsByName("TimeUp")[0].play();
            this.commit("SetAdminBoard", "所有选手答题完毕!打开答题板!");
            if (state.quiz.ans_type > 1) {
                setTimeout(() => {
                    state.players.forEach((p) => {
                        p.board = p._board;
                    })
                    this.commit("SetAdminBoard", "选手们的答案都展示出来了，那么结果会如何呢？");
                }, 2500);
            } else {
                this.commit("SetAdminBoard", "答题结束!公布答案!");
            }
        },
        SetImgShow(state, id) {
            state.imgShowSrc = id
        },
        SetImgSrc(state, src) {
            state.quiz.imgSrc = src;
        },
        SetMusicGoon(state, id) {
            state.musicGoon = id;
        },
        ShowNewOption(state,option){
            state.options.push(option);
        },
        SetPlayerNum(state,info){
            state.playerNum.player = info.player;
            state.playerNum.all = info.all;
        },
        SetQuizNum(state,num){
            state.quizNum = num;
        },
        SetRankInfo(state,info){
            if(!info.title){
                state.rankInfo.rank = [];
                state.rankInfo.title = "";
            }else{
                state.rankInfo.title = info.title;
                info.rank.sort((a,b) => {
                    if(a.score!=b.score)return b.score-a.score;
                    return b.times-a.times;
                })
                let _i = 0;
                let _timer = setInterval(() => {
                    if(_i>4 || _i>info.rank.length-1){
                        clearInterval(_timer);
                    }else{
                        state.rankInfo.rank.push(info.rank[_i++]);
                    }
                }, 1500);
            }
        }
    },
    getters: {
        getIndexByID: (state) => (id) => {
            return state.players.findIndex(
                p => p.id == id
            )
        },
        getUidByID: (state) => (id) => {
            return state.players.find(
                p => p.id == id
            ).uid;
        },
        getNameByID: (state) => (id) => {
            return state.players.find(
                p => p.id == id
            ).name;
        },
        getFullName: (state) => (id) => {
            for (let i = 0; i < state.players.length; i++)
                if (state.players[i].id == id) return `[${state.players[i].uid}]${state.players[i].name}`
        },
        getAnserName: (state) => {
            for (let i = 0; i < state.players.length; i++)
                if (state.players[i].id == state.anser) return `[${state.players[i].uid}]${state.players[i].name}`
            return "Error";
        },
        getMusicSrc: (state) => {
            return state.quiz.musicSrc;
        }
    },
})