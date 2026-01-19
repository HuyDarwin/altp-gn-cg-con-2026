import { getDatabase, ref, set, update, onValue, remove, get } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

$(function () {
    "use strict";

    window.CONTROLLER = window.CONTROLLER || {};

    (function (con) {
        //

        const db = getDatabase();
        const dbKey = "altpgn";

        //

        function upd(key, val) {
            update(ref(db, dbKey), {
                [key]: val
            })
        }

        function enb(key) {
            $(key).removeAttr('disabled')
        }

        function dib(key) {
            $(key).attr('disabled', true);
        }
      
        $('button [name="autoname_class"]').click(function(){
          var bid = this.class;
          upd(bid, 1);
        })
      
        $('button [name="autoname"]').click(function(){
          var bid = this.id;
          upd(bid, 1);
        })
      
        //
      
        //
      
        con.ResetAnswerFC = function(answer = "") {
          if (answer == "") {
            $(".ans-main").css("opacity", 1);
            $(".ans-final").css("opacity", 0);
            $(".ans-correct").css("opacity", 0);
            $(".ans-letter svg text").css("fill", "#ecac17");
            $(".ans-text svg text").css("fill", "white");
          }
          else{
            $("#answer-" + answer + " .ans-main").css("opacity", 1);
            $("#answer-" + answer + " .ans-final").css("opacity", 0);
            $("#answer-" + answer + " .ans-correct").css("opacity", 0);
            $("#answer-" + answer + " .ans-letter svg text").css("fill", "#ecac17");
            $("#answer-" + answer + " .ans-text svg text").css("fill", "white");
          }
        }
      
        con.FinalAnswer = function(answer) {
          $("#answer-" + answer + " .ans-main").css("opacity", 0);
          $("#answer-" + answer + " .ans-final").css("opacity", 1);
          $("#answer-" + answer + " .ans-correct").css("opacity", 0);
          $("#answer-" + answer + " .ans-letter svg text").css("fill", "#000000");
          $("#answer-" + answer + " .ans-text svg text").css("fill", "#000000");
        }
      
        con.CorrectAnswer = function(answer) {
          $("#answer-" + answer + " .ans-main").css("opacity", 0);
          $("#answer-" + answer + " .ans-final").css("opacity", 0);
          $("#answer-" + answer + " .ans-correct").css("opacity", 1);
          $("#answer-" + answer + " .ans-letter svg text").css("fill", "#000000");
          $("#answer-" + answer + " .ans-text svg text").css("fill", "#000000");
        }
      
        con.RenderPlayerMoneytree = function(num_of_qs, now, top, milestone) {
          var htmlMTString = "";
          var txt = "";
          txt += '<div class="moneyTd-prize">';
          txt += '<svg data-top="0" data-ypos="0" data-lines="1" data-scale="true">';
          txt += '<text lengthAdjust="spacingAndGlyphs" id="line_1"></text>';
          txt += '</svg>';
          txt += '</div>';
          
          for (var i = num_of_qs; i >= 1; i--) {
            htmlMTString += '<div class="moneyTr" id="moneyTr-' + i + '">';
            
            if (i < now) {
              if (milestone.includes(i)) {
                htmlMTString += '<div class="moneyTd" id="moneyTd-cm">';
              }
              else {
                htmlMTString += '<div class="moneyTd" id="moneyTd-cn">';
              }
            }
            else if (i > top) {
              htmlMTString += '<div class="moneyTd" id="moneyTd-et3">';
            }
            else if (i == top) {
              if (i == now) {
                htmlMTString += '<div class="moneyTd" id="moneyTd-nlp">';
              }
              else{
                htmlMTString += '<div class="moneyTd" id="moneyTd-lp">';
              }
            }
            else if (now < i && i < top) {
              if (1 <= i && i <= 5) {
                htmlMTString += '<div class="moneyTd" id="moneyTd-t1">';
              }
              else if (6 <= i && i <= 10) {
                htmlMTString += '<div class="moneyTd" id="moneyTd-t2">';
              }
              else if (11 <= i) {
                htmlMTString += '<div class="moneyTd" id="moneyTd-t3">';
              }
            }
            else if(i == now) {
              if (1 <= i && i <= 5) {
                htmlMTString += '<div class="moneyTd" id="moneyTd-nt1">';
              }
              else if (6 <= i && i <= 10) {
                htmlMTString += '<div class="moneyTd" id="moneyTd-nt2">';
              }
              else if (11 <= i) {
                htmlMTString += '<div class="moneyTd" id="moneyTd-nt3">';
              }
            }
            
            htmlMTString += txt;
            htmlMTString += '</div>';
            htmlMTString += '</div>';
          }
          
          $(".moneytree").html(htmlMTString);
        }
      
        //
      
        con.ScaleText = function(){
          
        }
      
        con.TextUpdateData(".fff-q-no-text", "Câu hỏi số", 1);
        con.TextUpdateData(".fff-time-left-text", "Thời gian còn lại", 1);
      
        //

        onValue(ref(db, dbKey), (snapshot) => {
            const data = snapshot.val();
            
            //con.ScaleText();
          
            $(".holder").css("top", "1920px");
            $("#background").css("top", "0px");
            if(data.mode == 1) {
              if (number_of_player == 7) {
                $("#holder-1-host").css("top", "0px");
              }
              else{
                $("#holder-1").css("top", "0px");
              }
            }
            else if(data.mode == 2){
              if (number_of_player == 7) {
                $("#holder-2-host").css("top", "0px");
              }
              else{
                $("#holder-2").css("top", "0px");
              }
            }
          
            $(".question svg").css("opacity", data.question_opacity);
          
            if (data.answer_a_opacity == 0) {
              $("#answer-a svg").css("opacity", 0);
            }
            else if (data.answer_fifty_fifty_a == true) {
              $("#answer-a svg").css("opacity", 0.25);
            }
            else {
              $("#answer-a svg").css("opacity", 1);
            }
          
            if (data.answer_b_opacity == 0) {
              $("#answer-b svg").css("opacity", 0);
            }
            else if (data.answer_fifty_fifty_b == true) {
              $("#answer-b svg").css("opacity", 0.25);
            }
            else {
              $("#answer-b svg").css("opacity", 1);
            }
          
            if (data.answer_c_opacity == 0) {
              $("#answer-c svg").css("opacity", 0);
            }
            else if (data.answer_fifty_fifty_c == true) {
              $("#answer-c svg").css("opacity", 0.25);
            }
            else {
              $("#answer-c svg").css("opacity", 1);
            }
          
            if (data.answer_d_opacity == 0) {
              $("#answer-d svg").css("opacity", 0);
            }
            else if (data.answer_fifty_fifty_d == true) {
              $("#answer-d svg").css("opacity", 0.25);
            }
            else {
              $("#answer-d svg").css("opacity", 1);
            }
          
            $(".answer .ans-main").css("opacity", 1);
            $(".answer .ans-final").css("opacity", 0);
            $(".answer .ans-correct").css("opacity", 0);
            
            con.TextUpdateData(".fff-q-gpx .question", data.question_line_1, 1);
            con.TextUpdateData(".fff-q-gpx .question", data.question_line_2, 2);
            if (data.showing_fff_order == true) {
              con.TextUpdateData(".fff-q-gpx #ans-letter-a", data.correct_order_1.toUpperCase() + ":", 1);
              con.TextUpdateData(".fff-q-gpx #ans-letter-b", data.correct_order_2.toUpperCase() + ":", 1);
              con.TextUpdateData(".fff-q-gpx #ans-letter-c", data.correct_order_3.toUpperCase() + ":", 1);
              con.TextUpdateData(".fff-q-gpx #ans-letter-d", data.correct_order_4.toUpperCase() + ":", 1);
              con.TextUpdateData(".fff-q-gpx #ans-text-a", eval("data.answer_" + data.correct_order_1), 1);
              con.TextUpdateData(".fff-q-gpx #ans-text-b", eval("data.answer_" + data.correct_order_2), 1);
              con.TextUpdateData(".fff-q-gpx #ans-text-c", eval("data.answer_" + data.correct_order_3), 1);
              con.TextUpdateData(".fff-q-gpx #ans-text-d", eval("data.answer_" + data.correct_order_4), 1);
            }
            else {
              con.TextUpdateData(".fff-q-gpx #ans-letter-a", "A:", 1);
              con.TextUpdateData(".fff-q-gpx #ans-letter-b", "B:", 1);
              con.TextUpdateData(".fff-q-gpx #ans-letter-c", "C:", 1);
              con.TextUpdateData(".fff-q-gpx #ans-letter-d", "D:", 1);
              con.TextUpdateData(".fff-q-gpx #ans-text-a", data.answer_a, 1);
              con.TextUpdateData(".fff-q-gpx #ans-text-b", data.answer_b, 1);
              con.TextUpdateData(".fff-q-gpx #ans-text-c", data.answer_c, 1);
              con.TextUpdateData(".fff-q-gpx #ans-text-d", data.answer_d, 1);
            }
          
            con.TextUpdateData(".fff-question-note", data.note, 1);
          
            con.TextUpdateData(".fff-q-no-number", data.fff_q_now, 1);
            con.TextUpdateData(".fff-time-left-number", data.timer, 1);
          
            // FFF Table
          
            for (var i=1;i<=6;i++) {
              con.TextUpdateData(".frt-"+i+" .frt-name",eval("data.cont_name_"+i) + ", " + eval("data.cont_hometown_"+i),1);
              con.TextUpdateData(".frt-"+i+" .frt-answer",eval("data.fff_answer_"+i).toUpperCase(),1);
              con.TextUpdateData(".frt-"+i+" .frt-times",eval("data.fff_times_"+i).toFixed(2),1);
              con.TextUpdateData(".frt-"+i+" .frt-total-score",eval("data.fff_total_score_"+i),1);
              con.TextUpdateData(".frt-"+i+" .frt-total-times",eval("data.fff_total_times_"+i).toFixed(2),1);
              
              if(eval("data.fff_player_enable_" + i) == true) {
                $(".frt-" + i).css("opacity", "1");
              }
              else{
                $(".frt-" + i).css("opacity", "0.5");
              }
              
              if(eval("data.fff_player_question_fastest_" + i ) == true) {
                $(".frt-" + i + " .frt-answer svg text").css({"fill": "lime", "font-weight": "bold"});
                $(".frt-" + i + " .frt-times svg text").css({"fill": "lime", "font-weight": "bold"});
              }
              else if(eval("data.fff_player_correct_" + i) == true) {
                $(".frt-" + i + " .frt-answer svg text").css({"fill": "lime", "font-weight": "normal"});
                $(".frt-" + i + " .frt-times svg text").css({"fill": "lime", "font-weight": "normal"});
              }
              else {
                $(".frt-" + i + " .frt-answer svg text").css({"fill": "#ecac17", "font-weight": "normal"});
                $(".frt-" + i + " .frt-times svg text").css({"fill": "#ecac17", "font-weight": "normal"});
              }
                    
              if (eval("data.fff_player_winner_" + i) == true) {
                $(".frt-" + i + " .frt-name svg text").css({"fill": "yellow", "font-weight": "bold"});
              }
              else {
                $(".frt-" + i + " .frt-name svg text").css({"fill": "white", "font-weight": "normal"});
              }
              
              if(eval("data.fff_announce_winner_" + i) == 1) {
                $(".frt-" + i).css("background-color", "green");
              }
              else {
                $(".frt-" + i).css("background-color", "transparent");
              }
            }
            
            // Main
            
            con.TextUpdateData(".main-q-gpx .question", data.question_line_1, 1);
            con.TextUpdateData(".main-q-gpx .question", data.question_line_2, 2);
            con.TextUpdateData(".main-q-gpx #ans-letter-a", "A:", 1);
            con.TextUpdateData(".main-q-gpx #ans-letter-b", "B:", 1);
            con.TextUpdateData(".main-q-gpx #ans-letter-c", "C:", 1);
            con.TextUpdateData(".main-q-gpx #ans-letter-d", "D:", 1);
            con.TextUpdateData(".main-q-gpx #ans-text-a", data.answer_a, 1);
            con.TextUpdateData(".main-q-gpx #ans-text-b", data.answer_b, 1);
            con.TextUpdateData(".main-q-gpx #ans-text-c", data.answer_c, 1);
            con.TextUpdateData(".main-q-gpx #ans-text-d", data.answer_d, 1);          

            con.RenderPlayerMoneytree(data.num_of_qs, data.q_now_follower, data.q_top_follower, [data.q_milestone]);
            for (var i = 1; i <= data.num_of_qs; i++) {
              var value = 0;
              if(eval("data.mt_value_" + i) != undefined){
                value = eval("data.mt_value_" + i);
              }
              if (value != null && $("#moneyTr-" + i + " .moneyTd").length) {
                con.TextUpdateData("#moneyTr-" + i + " .moneyTd .moneyTd-prize", accounting.formatMoney(value), 1);
              }
            }

            con.TextUpdateData(".mt-cont-name", eval("data.cont_name_" + data.cont_now).toUpperCase(), 1);
            con.TextUpdateData(".mt-q-left", (data.q_top - data.q_now + 1) + " CÂU HỎI");
            con.TextUpdateData(".mt-c-left", data.c_left + " NGƯỜI CHƠI");

            if(data.lifeline_on_pass == false) {
              $("#ll-pass .ll-used").css("opacity", 1);
            }
            else {
              $("#ll-pass .ll-used").css("opacity", 0);
            }
          
            if(data.cheque_player == data.cont_now) {
              $("#ll-1, #ll-2").css("opacity", 1);
            }
            else{
              $("#ll-1, #ll-2").css("opacity", 0);
            }
          
            for (var i = 1; i <= 2; i++) {
              if(eval("data.lifeline_on_" + i) == false) {
                $("#ll-" + i + " .ll-used").css("opacity", 1);
              }
              else{
                $("#ll-" + i + " .ll-used").css("opacity", 0);
              }
            }
          
            con.TextUpdateData(".main-timer", data.timer, 1);
          
            con.ResetAnswerFC();
            if(data.final_ans == "a") {
              con.FinalAnswer("a");
            }
            else if(data.final_ans == "b") {
              con.FinalAnswer("b");
            }
            else if(data.final_ans == "c") {
              con.FinalAnswer("c");
            }
            else if(data.final_ans == "d") {
              con.FinalAnswer("d");
            }
            if(data.correct_ans_player == "a") {
              con.CorrectAnswer("a");
            }
            else if(data.correct_ans_player == "b") {
              con.CorrectAnswer("b");
            }
            else if(data.correct_ans_player == "c") {
              con.CorrectAnswer("c");
            }
            else if(data.correct_ans_player == "d") {
              con.CorrectAnswer("d");
            }
          
            if(data.next_cont_info_opacity == 1) {
              con.TextUpdateData(".next-cont-info", "Tiếp theo: " + eval("data.cont_name_" + data.next_cont_id), 1); 
            }
            else {
              con.TextUpdateData(".next-cont-info", "", 1);              
            }
          
            if(data.correct_ans == "a" || data.correct_ans == "b" || data.correct_ans == "c" || data.correct_ans == "d") {
              con.TextUpdateData(".correct-ans-info", data.correct_ans.toUpperCase(), 1);                    
              if (data.final_ans == data.correct_ans) {
                $(".correct-ans-info").css("background-color", "green");
              }
              else {
                $(".correct-ans-info").css("background-color", "red");
              }
            }
            else {
              con.TextUpdateData(".correct-ans-info", "", 1);      
              $(".correct-ans-info").css("background-color", "gray");
            }
          
            con.TextUpdateData(".question-winnings-info", accounting.formatMoney(data.question_winnings), 1);
            con.TextUpdateData(".lose-winnings-info", accounting.formatMoney(data.total_winnings), 1);
            con.TextUpdateData(".top-winnings-info", accounting.formatMoney(eval("data.mt_value_" + data.q_top)), 1);
          
            $(".controller-message").html(data.controller_message);
            $(".other-info").html(data.other_info);
            $(".main-question-note").html(data.note);
          
            con.TextUpdateData(".now-cont-info", eval("data.cont_name_" + data.cont_now) + ", " + eval("data.cont_hometown_" + data.cont_now), 1);
        });       
      
        //
        var delta = 50;
        var last = 0;
      
        $(document).on('keydown',function(e){
          if(e.keyCode == 13){
            var now = new Date();
            if(now - last > delta && $(".fff-enter").prop("disabled") != true) {
              $(".fff-enter").click();
              last = now;
            }
          }
          else if(e.keyCode == 46){
            var now = new Date();
            if(now - last > delta && $(".fff-del").prop("disabled") != true) {
              $(".fff-del").click();
              last = now;
            }
          }
          else if(e.keyCode == 49 || e.keyCode == 65){
            var now = new Date();
            if(now - last > delta && $(".fff-a").prop("disabled") != true) {
              $(".fff-a").click();
              last = now;
            }
          }
          else if(e.keyCode == 50 || e.keyCode == 66){
            var now = new Date();
            if(now - last > delta && $(".fff-b").prop("disabled") != true) {
              $(".fff-b").click();
              last = now;
            }
          }
          else if(e.keyCode == 51 || e.keyCode == 67){
            var now = new Date();
            if(now - last > delta && $(".fff-c").prop("disabled") != true) {
              $(".fff-c").click();
              last = now;
            }
          }
          else if(e.keyCode == 52 || e.keyCode == 68){
            var now = new Date();
            if(now - last > delta && $(".fff-d").prop("disabled") != true) {
              $(".fff-d").click();
              last = now;
            }
          }
        });           

    }(window.CONTROLLER = window.CONTROLLER || {}));
});