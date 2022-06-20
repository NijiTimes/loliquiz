import {io} from "socket.io-client"
import store from '../store'
const socket = io("http://1.117.141.20:3000");
//const socket = io();

socket.on('connecting',() => {
    console.log("connecting")
})

socket.on('disconnect',(a) => {
    console.log("disconnect",a)
})
socket.on('connect_failed',(a) => {
    console.log("connect_failed",a)
})
socket.on('error',(a) => {
    console.log("error",a)
})
socket.on('message',(a) => {
    console.log("message",a)
})

socket.on('connect', () => {
    console.log(socket.id);
    socket.on("InitData",(data) => {
        store.dispatch("initData",data);
    }) //接受初始化信息，回显数据。
    socket.on("SomeOneJoinRoom",(p) => {
        store.dispatch("addPlayer",p);
    })//接受新加入者的信息。
    socket.on("ReciveMessage",(msg)=>{
        store.dispatch("addMessage",msg);
    })//接受聊天消息
    socket.on("SomeOneLeaveRoom",(id) => {
        store.dispatch("removePlayer",id);
    })//接受离开者的信息。
    socket.on("ReciveQuizBaseInfo",(q) => {
        store.commit("SetQuizBaseInfo",q);
    })//接收新题目的基本信息
    socket.on("ReciveNewWord",(word) => {
        store.commit("UpdataText",word);
    })//接收题目中新的一个字
    socket.on("SetAnser",(id) => {
        store.commit("SetAnser",id);
    })//接收当前答题者的信息
    socket.on("ReciveBoardAns",(ans) => {
        ans.forEach(a => {
            store.commit("SetBoardAns",a);
        });
    })//接受答题者们的答案
    socket.on("ReciveBoardAnsLast",(ans) => {
        ans.forEach(a => {
            store.commit("SetBoardAnsLast",a);
        });
    })
    socket.on("ReciveAnsCheck",(result) => {
        store.dispatch("solveAnsResult",result);
    })//接受当前题目的答题的结果
    socket.on("UpdateStates",(s) => {
        store.commit("UpdatePlayerState",s);
    })//更新答题板状态
    socket.on("ContinueShow",() => {
        store.commit("ContinueTimer",1);
        if(store.state.quiz.quiz_type == 2){
            setTimeout(() => {
                store.commit("SetMusicGoon",true);
            }, 1000);
        }
        if(store.state.user.id == store.state.anser){
            store.commit("SetPop",2);
            setTimeout(() => {
                store.commit("SetPop",1);
            }, 5000);
        }else{
            store.commit("SetPop",1);
        }
    })
    socket.on("ShowAns",(ans) => {
        store.commit("SetAnswer",ans);
    })
    socket.on("RestartGame",() => {
        store.commit("InitQuizInfo");
    })
    socket.on("TextShowDown",() => {
        store.commit("SetTimer",{id:0})
    })
    socket.on("Ready",() => {
        store.commit("Ready");
    })
    socket.on("ReciveQuizAnsAdmin",(ans) => {
        store.commit("SetQuizAnsAdmin",ans);
    })
    socket.on("AllPlayerAnsDown",() => {
        store.commit("SolveAllPlayerAnsDown");
    })
    socket.on("ReciveImgSrc",(src) => {
        store.commit("SetImgSrc",src);
    })
    socket.on("MusicReplay",() => {
        if(store.state.musicGoon){
            document.getElementById("QuizMusic").currentTime = 0;
        }else{
            store.commit("SetMusicGoon",true);
        }
    })
    socket.on("StartMusic",() => {
        store.commit("SetMusicGoon",true);
    })
    socket.on("SomeOneRight",(id) => {
        store.commit("SetAdminBoard",store.getters.getFullName(id)+"回答正确!")
        document.getElementsByName("bingo")[0].play();
    })
    socket.on("SomeOneWrong",(id) => {
        store.commit("SetAdminBoard",store.getters.getFullName(id)+"很可惜，回答错误。")
        document.getElementsByName("wrong")[0].play();
    })
    socket.on("ShowOption",(option) => {
        store.commit("ShowNewOption",option);
    })
    socket.on("SetPlayerNum",(info) => {
        store.commit("SetPlayerNum",info);
    })
    socket.on("SetQuizNum",(num) => {
        store.commit("SetQuizNum",num);
    })
    socket.on("ShowScore",(info) => {
        if(store.state.rankInfo.title){
            store.commit("SetRankInfo",{title:""})
        }else{
            if(info.title == "游戏结束"){

                setTimeout(() => {
                    document.getElementById("QuizMusic").src = "http://music.163.com/song/media/outer/url?id=27907218.mp3";
                    document.getElementById("QuizMusic").play();
                }, 100);
                store.commit("SetAdminBoard", "游戏结束!现在公布排行榜!感谢大家的游玩。");
            }
            store.commit("SetRankInfo",info);
        }
    })
    socket.on("kicked",() => {
        alert("你已被房主踢出房间。");
    })
})


export default socket;