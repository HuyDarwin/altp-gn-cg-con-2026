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

        function upd_passkey(key, val) {
            update(ref(db, dbKey + "_passkey"), {
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
          //console.log(this.id);
          upd(bid, 1);
        })
      
        $(".autoname").click(function(){
          upd(this.id, 1);
        });
      
        function getRandomIntInclusive(min, max) {
          const minCeiled = Math.ceil(min);
          const maxFloored = Math.floor(max);
          return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
        }
      
        function ForbiddenButton (button) {
          $(button).css("background-color", "red");
          setTimeout(function(){
            $(button).css("background-color", "black");
          }, 250);
        }
      
        // Popup - Passkey
      
        const player_url = "player-raki.html";
        const host_url = "host-alse.html";
      
        $(".popup-close").click(function(){
          $(".popup").css("top", "1920px");
        });
      
        $(".edit-passkey").click(function(){
          $(".popup").css("top", "1920px");
          $("#popup-passkey").css("top", "0px");
        });
      
        $(".ppp-input").keyup(function(e){
          if((e.keyCode || e.which) == 13) { 
            var id = "#" + $(this).parent().attr("id");
            var pass_inp = $(this).val();
            pass_inp = pass_inp.slice(0, -1);
            $(id + " .ppp-input").val(pass_inp);
            $(id + " .ppp-submit").click();
          }
        });
      
        $(".ppp-random").click(function(){
          var id = "#" + $(this).parent().attr("id");
          var who = id.substr(5);
          var passkey = String.fromCharCode(getRandomIntInclusive(97,122),getRandomIntInclusive(97,122),getRandomIntInclusive(97,122),getRandomIntInclusive(97,122),getRandomIntInclusive(97,122),getRandomIntInclusive(97,122));
          
          upd_passkey(who + "_passkey", passkey);
        });
      
        $(".ppp-submit").click(function(){
          var id = "#" + $(this).parent().attr("id");
          var who = id.substr(5);
          var passkey = $(id + " .ppp-input").val();
          upd_passkey(who + "_passkey", passkey);
        });
      
        upd_passkey("player_url", player_url);
        upd_passkey("host_url", host_url);
      
        onValue(ref(db, dbKey + "_passkey"), (snapshot) => {
            const data = snapshot.val();
          
            var pp_copy_string = "";
            for (var i = 1; i <= 6; i++) {
              con.TextUpdateData("#ppp_player_" + i + " .ppp-pass", eval("data.player_" + i + "_passkey"), 1);
              pp_copy_string += "Mã NC" + i + ": " + eval("data.player_" + i + "_passkey") + "\n";
            }
            con.TextUpdateData("#ppp_host .ppp-pass", data.host_passkey, 1);
            pp_copy_string += "Mã DCT: " + data.host_passkey + "\n";
            $(".popup-passkey-copy").html(pp_copy_string);
        });
      
        //
      
        var mode = 0;
      
        const num_of_qs = 15;
      
        var q_now = 1;
        var q_top = 15;
        var q_milestone = 5;
      
        var q_now_follower = 1;
        var q_top_follower = 15;
      
        var mt_value = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        //mt_value = [100,200,300,400,500,700,1000,1500,2000,3500,5000,10000,20000,30000,50000];
        //mt_value = [1000,2000,3000,4000,5000,7000,10000,15000,20000,35000,50000,100000,200000,300000,1000000];
        mt_value = [1000,2000,3000,4000,5000,10000,15000,20000,25000,35000,50000,100000,200000,300000,1000000];
        var secs = [15,15,15,15,15,30,30,30,30,30,45,45,45,45,45];
      
        const num_of_cs = 6;
        var contestants = [];
        var cont_now = 1;
        //var q_left = 15;
        var c_left = 6;
      
        var fff_questions = [];
        var main_questions = [];
        var switch_questions = [];
      
        var fff_q_now = 1;
      
        var fff_q_using = 0;
        var main_q_using = 0;
      
        var fff_winner = 0;
      
        var timer = 0;
      
        var fff_player_enable = [true, true, true, true, true, true];
        var fff_player_correct = [false, false, false, false, false, false];
      
        var fff_player_times = [0, 0, 0, 0, 0, 0];
        var fff_player_total_score = [0, 0, 0, 0, 0, 0];
        var fff_player_total_times = [0, 0, 0, 0, 0, 0];
      
        var fff_player_question_fastest = [false, false, false, false, false, false];
        var fff_player_winner = [false, false, false, false, false, false];
      
        var fff_epoch = 0;
      
        var is_timer_running = false;
        var timer_int;
      
        var fff_auto_next_ques = false;
      
        var available_players = [true, true, true, true, true, true];
      
        var lifeline_on_pass = true;
        var lifeline_on = [true, true];
      
        var auto_set_follower = false;
      
        var is_revealing_main_question = false;
        var timer_counter = 0;
      
        var is_a_round_played = false;
      
        var cheque_player = 0;
        var auto_set_cheque_player = false;
      
        var final_ans = "";
        var correct_ans = "";
          
        var answer_fifty_fifty_a = false;
        var answer_fifty_fifty_b = false;
        var answer_fifty_fifty_c = false;
        var answer_fifty_fifty_d = false;
      
        var switch_q_using = 0;
        var is_switch_question_used = false;
      
        var stq_main_ques;
      
        //
      
        function ResetTimer(){
          clearInterval(timer_int);
          is_timer_running = false;
          timer = 0;
          upd("timer", timer);
        }
        function PlayTimer(secs) {
          ResetTimer();
          is_timer_running = true;
          timer = secs;
          upd("timer", timer);
          timer_int = setInterval(function () {
            if(is_timer_running && timer == 0){
              ResetTimer();
            }
            else if (is_timer_running && timer != 0) {
              timer--;
              upd("timer", timer);
              if(timer == 0 && is_revealing_main_question) {
                if(lifeline_on_pass == false) {
                  upd("hide_no_pass", 1);
                }
                $("#h4s-main-3").html("Chạy đồng hồ");
                timer_counter = 0;        
                upd("sfx_stop_timer", 1);
                
                final_ans = "";
                upd("final_ans", final_ans);
                correct_ans = main_questions[main_q_using - 1].CorrectAns;
                UpdateMainQuestionsData(2);
                enb("#h4s-main-10");
                
                setTimeout(function(){
                  upd("stop_q_bed", 1);
                }, 500);
              }
            }
          }, 1000);
        }
        function PauseTimer(){
          is_timer_running = false;
        }
        function ResumeTimer(){
          is_timer_running = true;
        }
      
        function UpdateContestantsInfo(){
          for(var i = 1; i <= num_of_cs; i++) {
            if (i <= contestants.length && contestants[i - 1] != undefined) {
              upd("cont_name_" + i, contestants[i - 1].Name);
              upd("cont_hometown_" + i, contestants[i - 1].Hometown);
            }
            else {
              upd("cont_name_" + i, "Người chơi " + i);
              upd("cont_hometown_" + i, "Quê quán " + i);
            }
          }
        }
      
        function UpdateMoneytreeData(){
          upd("q_now", q_now);
          upd("q_top", q_top);
          
          upd("q_now_follower", q_now_follower);
          upd("q_top_follower", q_top_follower);
          
          upd("q_milestone", q_milestone);
          
          for(var i = 1; i <= num_of_qs; i++) {
            if (i <= mt_value.length && mt_value[i - 1] != undefined) {
              upd("mt_value_" + i, mt_value[i - 1]);
            }
            else {
              upd("mt_value_" + i, 0);
            }
          }
        }
      
        function CalculateFFFQuestionFastestPlayer() {
          var min_time = 2000000000;
          for (var i = 1; i <= num_of_cs; i++) {
            if (fff_player_correct[i - 1] == 1) {
              if (fff_player_times[i - 1] < min_time) {
                min_time = fff_player_times[i - 1];
                fff_player_question_fastest = [false, false, false, false, false, false];
                fff_player_question_fastest[i - 1] = true;
              }
              else if(fff_player_times[i - 1] == min_time) {
                fff_player_question_fastest[i - 1] = true;
              }
            }
          }
          for (var i = 1; i <= num_of_cs; i++) {
            upd("fff_player_question_fastest_" + i, fff_player_question_fastest[i - 1]);
          }
        }
      
        function FFFShowPlayerCorrect() {
          var correct_index = [];
          for (var i = num_of_cs; i >= 1; i--) {
            if (fff_player_correct[i - 1] == true) {
              correct_index.push(i);
            }
          }
          
          function getToEach(i){
            upd("fff_player_correct_" + correct_index[i], true);
            upd("fff_reveal_correct_" + correct_index[i], 1);
            if (i + 1 < correct_index.length){
              setTimeout(function(){
                getToEach(i + 1);
              }, 50);
            }
          }
          
          getToEach(0);
        }
      
        function FFFShowPlayerCorrectTimes() {
          var correct_index = [];
          for (var i = num_of_cs; i >= 1; i--) {
            if (fff_player_correct[i - 1] == true) {
              correct_index.push(i);
            }
          }
          
          function getToEach(i){
            upd("fff_reveal_times_" + correct_index[i], 1);
            if (i + 1 < correct_index.length){
              setTimeout(function(){
                getToEach(i + 1);
              }, 50);
            }
          }
          
          getToEach(0);
        }
      
        function FFFShowWinner() {
          if(1 <= fff_winner && fff_winner <= num_of_cs){
            upd("fff_reveal_winner_" + fff_winner, 1);
            upd("fff_announce_winner_" + fff_winner, 1);
          }
        }
      
        function CalculateFFFWinner(){          
          fff_winner = 0;
          fff_player_winner = [false, false, false, false, false, false];
          
          var max_score = 0, min_time = 2000000000;
          for (var i = 1; i <= num_of_cs; i++) {
            if (fff_player_total_score[i - 1] > 0) {
              if (fff_player_total_score[i - 1] > max_score) {
                max_score = fff_player_total_score[i - 1];
                min_time = fff_player_total_times[i - 1];
                fff_player_winner = [false, false, false, false, false, false];
                fff_player_winner[i - 1] = true;
                fff_winner = i;
              }
              else if (fff_player_total_score[i - 1] == max_score) {
                if (fff_player_total_times[i - 1] < min_time) {
                  min_time = fff_player_total_times[i - 1];
                  fff_player_winner = [false, false, false, false, false, false];
                  fff_player_winner[i - 1] = true;
                  fff_winner = i;
                }
                else if(fff_player_total_times[i - 1] == min_time) {
                  fff_player_winner[i - 1] = true;
                  fff_winner = 0;
                }
              }
            }
          }
          
          upd("fff_winner", fff_winner);
          for (var i = 1; i <= num_of_cs; i++) {
            upd ("fff_player_winner_" + i, fff_player_winner[i - 1]);
          }
        }
      
        function FFFAddResults(){
          for (var i = 1; i <= num_of_cs; i++) {
            if (fff_player_correct[i - 1] == 1) {
              fff_player_total_score[i - 1]++;
              fff_player_total_times[i - 1] += fff_player_times[i - 1];
              upd ("fff_total_score_" + i, fff_player_total_score[i - 1]);
              upd ("fff_total_times_" + i, fff_player_total_times[i - 1]);
            }
          }
        }
      
        function ResetFFFResultsData(reset_total = false) {        
          for (var i = 1; i <= num_of_cs; i++) {
            upd("fff_answer_" + i, "");
            fff_player_times[i - 1] = 0;
            upd("fff_times_" + i, fff_player_times[i - 1]);
            fff_player_correct[i - 1] = false;
            upd("fff_player_correct_" + i, fff_player_correct[i - 1]);
            fff_player_question_fastest[i - 1] = false;
            upd("fff_player_question_fastest_" + i, fff_player_question_fastest[i - 1]);
            upd("fff_announce_correct_" + i, 0);
            upd("fff_announce_times_" + i, 0);
            
            fff_player_winner[i - 1] = false;
            upd("fff_player_winner_" + i, fff_player_winner[i - 1]);
            upd("fff_announce_winner_" + i, 0);
            
            if (reset_total == true) {
              fff_player_total_score[i - 1] = 0;
              upd("fff_total_score_" + i, fff_player_total_score[i - 1]);
              fff_player_total_times[i - 1] = 0;
              upd("fff_total_times_" + i, fff_player_total_times[i - 1]);
              //fff_player_winner[i - 1] = false;
              //upd("fff_player_winner_" + i, fff_player_winner[i - 1]);
              //upd("fff_announce_winner_" + i, 0);
            }
          }
        }
      
        function NextPlayer(){
          if (cont_now == 6) {
            is_a_round_played = true;
            upd("is_a_round_played", is_a_round_played);
          }
          
          var next_cont = cont_now;
          var cnt = 0;
          
          while (cnt + 1 <= num_of_cs) {
            cnt++;
            next_cont++;
            next_cont %= num_of_cs;
            if(next_cont == 0) {
              next_cont = num_of_cs;
            }
            if (available_players[next_cont - 1] == true) {
              break;
            }
          }
          
          cont_now = next_cont;
          upd("cont_now", cont_now);
          
          if (is_a_round_played) {
            lifeline_on_pass = false;
            upd("lifeline_on_pass", lifeline_on_pass);
            $(".llo-activate-pass").css("background-color", "red"); 
          }
        }
      
        function Init(){
          is_revealing_main_question = false;
          
          remove(ref(db, dbKey));
          
          upd("num_of_qs", num_of_qs);
          
          upd("cont_now", cont_now);
          
          //upd("q_left", q_left);
          upd("c_left", c_left);
          upd("next_cont_id", 1);
          
          upd("question_line_1", "");
          upd("question_line_2", "");
          upd("answer_a", "");
          upd("answer_b", "");
          upd("answer_c", "");
          upd("answer_d", "");
          
          upd("final_ans", "");
          upd("correct_ans", "");
          upd("correct_ans_player", "");
          
          upd("showing_fff_order", false);
          upd("correct_order_1", "");
          upd("correct_order_2", "");
          upd("correct_order_3", "");
          upd("correct_order_4", "");
          
          upd("question_opacity", 0);
          upd("answer_a_opacity", 0);
          upd("answer_b_opacity", 0);
          upd("answer_c_opacity", 0);
          upd("answer_d_opacity", 0);
          
          upd("cont_to_introduce", 1);
          
          upd("sfx_wrong", 0);
          upd("sfx_correct", 0);
          upd("sfx_final_answer", 0);
          upd("sfx_q_bed", 0);
          
          upd("mode", 0);
          
          upd("is_a_round_played", is_a_round_played);
          
          for (var i = 1; i <= num_of_cs; i++) {
            upd("fff_player_enable_" + i, fff_player_enable[i - 1]);
            upd("fff_player_submit_" + i, 0);
          }
          ResetFFFResultsData(true);
          
          upd("fff_q_now", fff_q_now);
          upd("fff_winner", fff_winner);
          
          upd("timer", 0);
          upd("play_timer", 0);
          upd("timer_secs", 0);
          
          upd("allow_answering_fff", 0);
          
          upd("cheque_player", cheque_player);
          
          UpdateContestantsInfo();
          UpdateMoneytreeData();
          
          upd("question_winnings", 0);
          upd("total_winnings", 0);
          
          for (var i = 1; i <= 2; i++) {
            upd("lifeline_on_" + i, lifeline_on[i - 1]);
          }
          upd("lifeline_on_pass", lifeline_on_pass);
              
          upd("answer_fifty_fifty_a", answer_fifty_fifty_a);
          upd("answer_fifty_fifty_b", answer_fifty_fifty_b);
          upd("answer_fifty_fifty_c", answer_fifty_fifty_c);
          upd("answer_fifty_fifty_d", answer_fifty_fifty_d);
        }
      
        // Lifelines Function
        /// Fifty - Fifty
      
        var num_ff_ans_chosen = 0;
      
        var ff_ans_a_chosen = false;
        var ff_ans_b_chosen = false;
        var ff_ans_c_chosen = false;
        var ff_ans_d_chosen = false;
      
        function SetupFFLifeline(step) {
          if (step == 1) {
            var ans = main_questions[main_q_using - 1].CorrectAns;
            enb("#ll-ff-a, #ll-ff-b, #ll-ff-c, #ll-ff-d");
            dib("#ll-ff-" + ans);
            enb("#ll-ff-random, #ll-ff-activate");
          
            answer_fifty_fifty_a = false;
            answer_fifty_fifty_b = false;
            answer_fifty_fifty_c = false;
            answer_fifty_fifty_d = false;
            
            upd("answer_fifty_fifty_a", answer_fifty_fifty_a);
            upd("answer_fifty_fifty_b", answer_fifty_fifty_b);
            upd("answer_fifty_fifty_c", answer_fifty_fifty_c);
            upd("answer_fifty_fifty_d", answer_fifty_fifty_d);
          }
          else if (step == 2) {
            dib("#ll-ff-a, #ll-ff-b, #ll-ff-c, #ll-ff-d");
            dib("#ll-ff-random, #ll-ff-activate");
          }
          
          num_ff_ans_chosen = 0;
          ff_ans_a_chosen = false;
          ff_ans_b_chosen = false;
          ff_ans_c_chosen = false;
          ff_ans_d_chosen = false;   
          $("#ll-ff-a, #ll-ff-b, #ll-ff-c, #ll-ff-d").css("background-color", "black");
        }
      
        $("#ll-ff-a").click(function(){
          if (!ff_ans_a_chosen && num_ff_ans_chosen >= 2) {
            ForbiddenButton("#ll-ff-a");
          }
          else{
            ff_ans_a_chosen = !ff_ans_a_chosen;
            if (ff_ans_a_chosen) {
              num_ff_ans_chosen++;
              $(this).css("background-color", "green");
            }
            else{
              num_ff_ans_chosen--;
              $(this).css("background-color", "black");
            }
          }          
        });
      
        $("#ll-ff-b").click(function(){
          if (!ff_ans_b_chosen && num_ff_ans_chosen >= 2) {
            ForbiddenButton("#ll-ff-b");
          }
          else{
            ff_ans_b_chosen = !ff_ans_b_chosen;
            if (ff_ans_b_chosen) {
              num_ff_ans_chosen++;
              $(this).css("background-color", "green");
            }
            else{
              num_ff_ans_chosen--;
              $(this).css("background-color", "black");
            }
          }          
        });
      
        $("#ll-ff-c").click(function(){
          if (!ff_ans_c_chosen && num_ff_ans_chosen >= 2) {
            ForbiddenButton("#ll-ff-c");
          }
          else{
            ff_ans_c_chosen = !ff_ans_c_chosen;
            if (ff_ans_c_chosen) {
              num_ff_ans_chosen++;
              $(this).css("background-color", "green");
            }
            else{
              num_ff_ans_chosen--;
              $(this).css("background-color", "black");
            }
          }          
        });
      
        $("#ll-ff-d").click(function(){
          if (!ff_ans_d_chosen && num_ff_ans_chosen >= 2) {
            ForbiddenButton("#ll-ff-d");
          }
          else{
            ff_ans_d_chosen = !ff_ans_d_chosen;
            if (ff_ans_d_chosen) {
              num_ff_ans_chosen++;
              $(this).css("background-color", "green");
            }
            else{
              num_ff_ans_chosen--;
              $(this).css("background-color", "black");
            }
          }          
        });
      
        $("#ll-ff-random").click(function(){
          if (ff_ans_a_chosen) {
            $("#ll-ff-a").click();
          }
          if (ff_ans_b_chosen) {
            $("#ll-ff-b").click();
          }
          if (ff_ans_c_chosen) {
            $("#ll-ff-c").click();
          }
          if (ff_ans_d_chosen) {
            $("#ll-ff-d").click();
          }
          
          var ans_to_choose = [];
          var ans = main_questions[main_q_using - 1].CorrectAns;
          if (ans != "a") {
            ans_to_choose.push("a");
          }
          if (ans != "b") {
            ans_to_choose.push("b");
          }
          if (ans != "c") {
            ans_to_choose.push("c");
          }
          if (ans != "d") {
            ans_to_choose.push("d");
          }
          var no_choose = getRandomIntInclusive(0, 2);
          for (var i = 0; i <= 2; i++) if (i != no_choose) {
            $("#ll-ff-" + ans_to_choose[i]).click();
          }
        });
      
        $("#ll-ff-activate").click(function(){
          if (num_ff_ans_chosen != 2) {
            ForbiddenButton("#ll-ff-activate");
          }
          else {
            var ans_to_apply = [];
            if (ff_ans_a_chosen) {
              ans_to_apply.push("a");
            }
            if (ff_ans_b_chosen) {
              ans_to_apply.push("b");
            }
            if (ff_ans_c_chosen) {
              ans_to_apply.push("c");
            }
            if (ff_ans_d_chosen) {
              ans_to_apply.push("d");
            }
            upd("ll_ff_ans_1", ans_to_apply[0]);
            upd("ll_ff_ans_2", ans_to_apply[1]);
            
            upd("ll_ff_activate", 1);
          
            if (ans_to_apply[0] == "a" || ans_to_apply[1] == "a") {
              answer_fifty_fifty_a = true;
              upd("answer_fifty_fifty_a", answer_fifty_fifty_a);
            }
            if (ans_to_apply[0] == "b" || ans_to_apply[1] == "b") {
              answer_fifty_fifty_b = true;
              upd("answer_fifty_fifty_b", answer_fifty_fifty_b);
            }
            if (ans_to_apply[0] == "c" || ans_to_apply[1] == "c") {
              answer_fifty_fifty_c = true;
              upd("answer_fifty_fifty_c", answer_fifty_fifty_c);
            }
            if (ans_to_apply[0] == "d" || ans_to_apply[1] == "d") {
              answer_fifty_fifty_d = true;
              upd("answer_fifty_fifty_d", answer_fifty_fifty_d);
            }
            
            upd("sfx_ll_ff", 1);
            
            SetupFFLifeline(2);
          }
        });
      
        /// Switch the Question
      
        $(".switch-prev").click(function(){
          if (switch_q_using > 1) {
            switch_q_using--;
            $(".switch-q-using-index").html(switch_q_using);
          }
        });
      
        $(".switch-next").click(function(){
          if (switch_q_using < switch_questions.length) {
            switch_q_using++;
            $(".switch-q-using-index").html(switch_q_using);
          }
        });

        $(".switch-submit").click(function(){
          switch_q_using = parseInt($('.list-switch-qs').val());
          $(".switch-q-using-index").html(switch_q_using);
        });
        
        function SetupSTQLifeline(step) {
          if (step == 1) {
            stq_counter = 0;
            switch_q_using = main_q_using;
            $(".switch-q-using-index").html(switch_q_using);            
          }
          else if (step == 2) {
            if (is_switch_question_used) {
              main_questions[main_q_using - 1] = stq_main_ques;
              is_switch_question_used = false;
              enb("#stq-activate");
            }
          }
        }
      
        var stq_counter = 0;
        $("#stq-activate").click(function(){
          if(stq_counter == 0) {
            is_switch_question_used = true;
            correct_ans = main_questions[main_q_using - 1].CorrectAns;

            if(timer_counter == 1) {
              $("#h4s-main-3").click();
            }
            
            UpdateMainQuestionsData(2);
            dib("#h4s-main-5, #h4s-main-6, #h4s-main-7, #h4s-main-8");
            dib("#h4s-main-9, #h4s-main-10");
            
            $(this).html("Đáp án đúng");
            stq_counter++;
          }
          else if(stq_counter == 1) {
            UpdateMainQuestionsData(3);
            upd("reveal_correct_ans_" + correct_ans, 1);
            
            $(this).html("Ẩn câu hỏi");
            stq_counter++;
          }
          else if(stq_counter == 2) {
            upd("hide_main_question", 1);
            is_revealing_main_question = false;
            upd("stop_q_bed", 1);
            
            stq_main_ques = main_questions[main_q_using - 1];
            main_questions[main_q_using - 1] = switch_questions[switch_q_using - 1];
            
            enb("#h4s-main-2");
            enb("#h4s-main-3");
            enb("#h4s-main-4");
            dib("#h4s-main-5, #h4s-main-6, #h4s-main-7, #h4s-main-8, #h4s-main-9, #h4s-main-10");
            
            $(this).html("Kích hoạt");
            stq_counter = 0;
            dib("#stq-activate");
          }
        });
        
        //
      

        $(".reload").click(function(){
          upd("reload", 1);
        });
      
        $(".reload-auth").click(function(){
          upd("reload_auth", 1);
        });
      
        $(".to-main").click(function(){
          $(".screen-iframe").css("opacity",0);
          $("#i-main").css("opacity",1);
        });
        $(".to-moneytree").click(function(){
          $(".screen-iframe").css("opacity",0);
          $("#i-moneytree").css("opacity",1);
        });
      
        $(".load-c-info").click(function(){
          $(".get-c-info").click();
        });
        $(".load-mt-info").click(function(){
          $(".get-mt-info").click();
        });
        $(".load-q-info").click(function(){
          $(".get-q-info").click();
        });
        $(".load-sq-info").click(function(){
          $(".get-sq-info").click();
        });
      
        $(".get-c-info").on("change", function(e){
          var file = e.target.files[0];
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(e.target.result);
            var sheet = workbook.Sheets[workbook.SheetNames[0]];

            contestants = [];

            for(var i = 1; i <= num_of_cs; i++) {
              contestants.push({
                Name: sheet['B' + (i + 3)].v,
                Hometown: sheet['C' + (i + 3)].v
              });
            }
          
            UpdateContestantsInfo();
          };   

          reader.readAsArrayBuffer(file);
        });
      
        $(".get-mt-info").on("change", function(e){
          var file = e.target.files[0];
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(e.target.result);
            var sheet = workbook.Sheets[workbook.SheetNames[0]];

            mt_value = [];
            secs = [];

            var no = num_of_qs + 3;
            for(var i = 1; i <= num_of_qs; i++) {
              mt_value.push(sheet['B' + no].v);
              secs.push(parseInt(sheet['D' + no].v));
              if (sheet['C' + no].v == "x") {
                q_milestone = i;
                upd("q_milestone", q_milestone);
              }
              no--;
            }
          
            UpdateMoneytreeData();
          };   

          reader.readAsArrayBuffer(file);
        });
      
        function UpdateFFFQuestionsData (index) {
          var r = fff_q_using - 1;
          if (index == 0) {
            upd("question_line_1", "");
            upd("question_line_2", "");
            upd("answer_a", "");
            upd("answer_b", "");
            upd("answer_c", "");
            upd("answer_d", "");
            upd("correct_order_1", "");
            upd("correct_order_2", "");
            upd("correct_order_3", "");
            upd("correct_order_4", "");
            upd("note", "");
          }
         else  if (index == 1) {
            upd("question_line_1", fff_questions[r].Question_LineOne);
            upd("question_line_2", fff_questions[r].Question_LineTwo);
            upd("answer_a", fff_questions[r].AnswerA);
            upd("answer_b", fff_questions[r].AnswerB);
            upd("answer_c", fff_questions[r].AnswerC);
            upd("answer_d", fff_questions[r].AnswerD);
            upd("correct_order_1", "");
            upd("correct_order_2", "");
            upd("correct_order_3", "");
            upd("correct_order_4", "");
            upd("note", "");
          }
          else if (index == 2) {
            upd("question_line_1", fff_questions[r].Question_LineOne);
            upd("question_line_2", fff_questions[r].Question_LineTwo);
            upd("answer_a", fff_questions[r].AnswerA);
            upd("answer_b", fff_questions[r].AnswerB);
            upd("answer_c", fff_questions[r].AnswerC);
            upd("answer_d", fff_questions[r].AnswerD);
            upd("correct_order_1", fff_questions[r].CorrectOrder_One);
            upd("correct_order_2", fff_questions[r].CorrectOrder_Two);
            upd("correct_order_3", fff_questions[r].CorrectOrder_Three);
            upd("correct_order_4", fff_questions[r].CorrectOrder_Four);
            upd("note", fff_questions[r].Note);
          }
        }
      
        function UpdateMainQuestionsData (index) {
          var r = main_q_using - 1;
          if (index == 0) {
            final_ans = "";
            upd("final_ans", "");
            correct_ans = "";
            upd("question_line_1", "");
            upd("question_line_2", "");
            upd("answer_a", "");
            upd("answer_b", "");
            upd("answer_c", "");
            upd("answer_d", "");
            upd("correct_ans", "");
            upd("correct_ans_player", "");
            upd("note", "");
          }
         else  if (index == 1) {
            final_ans = "";
            upd("final_ans", "");
            correct_ans = "";
            upd("question_line_1", main_questions[r].Question_LineOne);
            upd("question_line_2", main_questions[r].Question_LineTwo);
            upd("answer_a", main_questions[r].AnswerA);
            upd("answer_b", main_questions[r].AnswerB);
            upd("answer_c", main_questions[r].AnswerC);
            upd("answer_d", main_questions[r].AnswerD);
            upd("correct_ans", "");
            upd("correct_ans_player", "");
            upd("note", "");
          }
          else if (index == 2) {
            upd("question_line_1", main_questions[r].Question_LineOne);
            upd("question_line_2", main_questions[r].Question_LineTwo);
            upd("answer_a", main_questions[r].AnswerA);
            upd("answer_b", main_questions[r].AnswerB);
            upd("answer_c", main_questions[r].AnswerC);
            upd("answer_d", main_questions[r].AnswerD);
            upd("correct_ans", main_questions[r].CorrectAns);
            upd("correct_ans_player", "");
            upd("note", main_questions[r].Note);
          }
          else if (index == 3) {
            upd("question_line_1", main_questions[r].Question_LineOne);
            upd("question_line_2", main_questions[r].Question_LineTwo);
            upd("answer_a", main_questions[r].AnswerA);
            upd("answer_b", main_questions[r].AnswerB);
            upd("answer_c", main_questions[r].AnswerC);
            upd("answer_d", main_questions[r].AnswerD);
            upd("correct_ans", main_questions[r].CorrectAns);
            upd("correct_ans_player", main_questions[r].CorrectAns);
            upd("note", main_questions[r].Note);
          }
        }
      
        $(".get-q-info").on("change", function(e){
          var file = e.target.files[0];
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(e.target.result);
            var fff_sheet = workbook.Sheets[workbook.SheetNames[0]];
            var main_sheet = workbook.Sheets[workbook.SheetNames[1]];

            fff_questions = [];
            main_questions = [];
            
            var no = 4;
            for (var i = 1; i <= 15; i++) {
              var c1 = "";
              var c2 = "";
              var c3 = "";
              var c4 = "";
              
              if(fff_sheet['C' + (no + 1)].v == 1) {
                c1 = "a";
              }
              else if(fff_sheet['C' + (no + 1)].v == 2) {
                c2 = "a";
              }
              else if(fff_sheet['C' + (no + 1)].v == 3) {
                c3 = "a";
              }
              else if(fff_sheet['C' + (no + 1)].v == 4) {
                c4 = "a";
              }
              
              if(fff_sheet['D' + (no + 1)].v == 1) {
                c1 = "b";
              }
              else if(fff_sheet['D' + (no + 1)].v == 2) {
                c2 = "b";
              }
              else if(fff_sheet['D' + (no + 1)].v == 3) {
                c3 = "b";
              }
              else if(fff_sheet['D' + (no + 1)].v == 4) {
                c4 = "b";
              }
              
              if(fff_sheet['E' + (no + 1)].v == 1) {
                c1 = "c";
              }
              else if(fff_sheet['E' + (no + 1)].v == 2) {
                c2 = "c";
              }
              else if(fff_sheet['E' + (no + 1)].v == 3) {
                c3 = "c";
              }
              else if(fff_sheet['E' + (no + 1)].v == 4) {
                c4 = "c";
              }
              
              if(fff_sheet['F' + (no + 1)].v == 1) {
                c1 = "d";
              }
              else if(fff_sheet['F' + (no + 1)].v == 2) {
                c2 = "d";
              }
              else if(fff_sheet['F' + (no + 1)].v == 3) {
                c3 = "d";
              }
              else if(fff_sheet['F' + (no + 1)].v == 4) {
                c4 = "d";
              }
              
              fff_questions.push({
                Question_LineOne: (fff_sheet['B' + no].v == ".") ? "" : fff_sheet['B' + no].v,
                Question_LineTwo: (fff_sheet['B' + (no + 1)].v == ".") ? "" : fff_sheet['B' + (no + 1)].v,
                AnswerA: (fff_sheet['C' + no].v == ".") ? "" : fff_sheet['C' + no].v,
                AnswerB: (fff_sheet['D' + no].v == ".") ? "" : fff_sheet['D' + no].v,
                AnswerC: (fff_sheet['E' + no].v == ".") ? "" : fff_sheet['E' + no].v,
                AnswerD: (fff_sheet['F' + no].v == ".") ? "" : fff_sheet['F' + no].v,
                CorrectOrder_One: c1,
                CorrectOrder_Two: c2,
                CorrectOrder_Three: c3,
                CorrectOrder_Four: c4,
                Note: (fff_sheet['G' + no].v == ".") ? "" : fff_sheet['G' + no].v
              });
              
              no += 2;
            }

            $(".list-fff-qs").empty();
            for(var i = 0; i < fff_questions.length; i++){
              $(".list-fff-qs").append('<option value="' + (i + 1) + '">' + (i + 1) + '. ' + (fff_questions[i].Question_LineOne + fff_questions[i].Question_LineTwo) + '</option>');
            }
            
            fff_q_using = 1;
            $(".fff-q-using-index").html(fff_q_using);
            UpdateFFFQuestionsData(0);
            
            enb(".fff-prev");
            enb(".fff-submit");
            enb(".fff-next");
            
            enb("#h4s-fff-2");
            
            no = 4;
            for (var i = 1; i <= num_of_qs; i++) {
              var ca = "";
              
              if(main_sheet['C' + (no + 1)].v == "x") {
                ca = "a";
              }
              else if(main_sheet['D' + (no + 1)].v == "x") {
                ca = "b";
              }
              else if(main_sheet['E' + (no + 1)].v == "x") {
                ca = "c";
              }
              else if(main_sheet['F' + (no + 1)].v == "x") {
                ca = "d";
              }
              
              main_questions.push({
                Question_LineOne: (main_sheet['B' + no].v == ".") ? "" : main_sheet['B' + no].v,
                Question_LineTwo: (main_sheet['B' + (no + 1)].v == ".") ? "" : main_sheet['B' + (no + 1)].v,
                AnswerA: (main_sheet['C' + no].v == ".") ? "" : main_sheet['C' + no].v,
                AnswerB: (main_sheet['D' + no].v == ".") ? "" : main_sheet['D' + no].v,
                AnswerC: (main_sheet['E' + no].v == ".") ? "" : main_sheet['E' + no].v,
                AnswerD: (main_sheet['F' + no].v == ".") ? "" : main_sheet['F' + no].v,
                CorrectAns: ca,
                Note: (main_sheet['G' + no].v == ".") ? "" : main_sheet['G' + no].v
              });
              
              no += 2;
            }

            $(".list-main-qs").empty();
            for(var i = 0; i < main_questions.length; i++){
              $(".list-main-qs").append('<option value="' + (i + 1) + '">' + (i + 1) + '. ' + (main_questions[i].Question_LineOne + main_questions[i].Question_LineTwo) + '</option>');
            }
            
            enb(".main-prev");
            enb(".main-submit");
            enb(".main-next");
            
            main_q_using = 1;
            $(".main-q-using-index").html(main_q_using);
            UpdateMainQuestionsData(0);
          
            enb("#h4s-main-2");
            enb("#h4s-main-3");
            enb("#h4s-main-4");
            dib("#h4s-main-5, #h4s-main-6, #h4s-main-7, #h4s-main-8, #h4s-main-9, #h4s-main-10");
          };   

          reader.readAsArrayBuffer(file);
        });
      
        $(".get-sq-info").on("change", function(e){
          var file = e.target.files[0];
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(e.target.result);
            var sheet = workbook.Sheets[workbook.SheetNames[0]];

            switch_questions = [];
            
            var no = 4;
            for (var i = 1; i <= num_of_qs; i++) {
              var ca = "";
              
              if(sheet['C' + (no + 1)].v == "x") {
                ca = "a";
              }
              else if(sheet['D' + (no + 1)].v == "x") {
                ca = "b";
              }
              else if(sheet['E' + (no + 1)].v == "x") {
                ca = "c";
              }
              else if(sheet['F' + (no + 1)].v == "x") {
                ca = "d";
              }
              
              switch_questions.push({
                Question_LineOne: (sheet['B' + no].v == ".") ? "" : sheet['B' + no].v,
                Question_LineTwo: (sheet['B' + (no + 1)].v == ".") ? "" : sheet['B' + (no + 1)].v,
                AnswerA: (sheet['C' + no].v == ".") ? "" : sheet['C' + no].v,
                AnswerB: (sheet['D' + no].v == ".") ? "" : sheet['D' + no].v,
                AnswerC: (sheet['E' + no].v == ".") ? "" : sheet['E' + no].v,
                AnswerD: (sheet['F' + no].v == ".") ? "" : sheet['F' + no].v,
                CorrectAns: ca,
                Note: (sheet['G' + no].v == ".") ? "" : sheet['G' + no].v
              });
              
              no += 2;
            }
            
            $(".list-switch-qs").empty();
            for(var i = 0; i < switch_questions.length; i++){
              $(".list-switch-qs").append('<option value="' + (i + 1) + '">' + (i + 1) + '. ' + (switch_questions[i].Question_LineOne + switch_questions[i].Question_LineTwo) + '</option>');
            }
            
            enb(".switch-prev");
            enb(".switch-submit");
            enb(".switch-next");
            
            switch_q_using = 1;
            $(".switch-q-using-index").html(main_q_using);
            UpdateMainQuestionsData(0);            
          };   

          reader.readAsArrayBuffer(file);
        });
      
        $(".c-now-prev").click(function(){
          cont_now--;
          cont_now %= num_of_cs;
          if(cont_now == 0) {
            cont_now = num_of_cs;
          }
          upd("cont_now", cont_now);
        });
        $(".c-now-next").click(function(){
          cont_now++;
          cont_now %= num_of_cs;
          if(cont_now == 0) {
            cont_now = num_of_cs;
          }
          upd("cont_now", cont_now);
        });
      
        $(".cp-now-prev").click(function(){
          cheque_player--;
          cheque_player %= num_of_cs;
          if(cheque_player == 0) {
            cheque_player = num_of_cs;
          }
          upd("cheque_player", cheque_player);
        });
        $(".cp-now-next").click(function(){
          cheque_player++;
          cheque_player %= num_of_cs;
          if(cheque_player == 0) {
            cheque_player = num_of_cs;
          }
          upd("cheque_player", cheque_player);
        });
      
        $(".ar-on").click(function(){
          is_a_round_played = true;
          upd("is_a_round_played", is_a_round_played);
        });
      
        $(".ar-off").click(function(){
          is_a_round_played = false;
          upd("is_a_round_played", is_a_round_played);
        });
      
        $(".fff-prev").click(function(){
          if (fff_q_using > 1) {
            fff_q_using--;
            $(".fff-q-using-index").html(fff_q_using);
            UpdateFFFQuestionsData(0);
            //upd("question_opacity", 0);
            upd("answer_a_opacity", 0);
            upd("answer_b_opacity", 0);
            upd("answer_c_opacity", 0);
            upd("answer_d_opacity", 0);
            upd("showing_fff_order", false);
            enb("#h4s-fff-2");
          }
        });
      
        $(".fff-next").click(function(){
          if (fff_q_using < fff_questions.length) {
            fff_q_using++;
            $(".fff-q-using-index").html(fff_q_using);
            UpdateFFFQuestionsData(0);
            //upd("question_opacity", 0);
            upd("answer_a_opacity", 0);
            upd("answer_b_opacity", 0);
            upd("answer_c_opacity", 0);
            upd("answer_d_opacity", 0);
            upd("showing_fff_order", false);
            enb("#h4s-fff-2");
          }
        });

        $(".fff-submit").click(function(){
          fff_q_using = parseInt($('.list-fff-qs').val());
          $(".fff-q-using-index").html(fff_q_using);
          UpdateFFFQuestionsData(0);
          //upd("question_opacity", 0);
          upd("answer_a_opacity", 0);
          upd("answer_b_opacity", 0);
          upd("answer_c_opacity", 0);
          upd("answer_d_opacity", 0);
          upd("showing_fff_order", false);
          enb("#h4s-fff-2");
        });
      
        $(".main-prev").click(function(){
          if (main_q_using > 1) {
            main_q_using--;
            $(".main-q-using-index").html(main_q_using);
            //UpdateMainQuestionsData(0);
            //upd("question_opacity", 0);
            //upd("answer_a_opacity", 0);
            //upd("answer_b_opacity", 0);
            //upd("answer_c_opacity", 0);
            //upd("answer_d_opacity", 0);
            
            enb("#h4s-main-2");
            enb("#h4s-main-3");
            enb("#h4s-main-4");
            dib("#h4s-main-5, #h4s-main-6, #h4s-main-7, #h4s-main-8, #h4s-main-9, #h4s-main-10");
          }
        });
      
        $(".main-next").click(function(){
          if (main_q_using < main_questions.length) {
            main_q_using++;
            $(".main-q-using-index").html(main_q_using);
            //UpdateMainQuestionsData(0);
            //upd("question_opacity", 0);
            //upd("answer_a_opacity", 0);
            //upd("answer_b_opacity", 0);
            //upd("answer_c_opacity", 0);
            //upd("answer_d_opacity", 0);
          
            enb("#h4s-main-2");
            enb("#h4s-main-3");
            enb("#h4s-main-4");
            dib("#h4s-main-5, #h4s-main-6, #h4s-main-7, #h4s-main-8, #h4s-main-9, #h4s-main-10");
          }
        });

        $(".main-submit").click(function(){
          main_q_using = parseInt($('.list-main-qs').val());
          $(".main-q-using-index").html(main_q_using);
          //UpdateMainQuestionsData(0);
          //upd("question_opacity", 0);
          //upd("answer_a_opacity", 0);
          //upd("answer_b_opacity", 0);
          //upd("answer_c_opacity", 0);
          //upd("answer_d_opacity", 0);
          
          enb("#h4s-main-2");
          enb("#h4s-main-3");
          enb("#h4s-main-4");
          dib("#h4s-main-5, #h4s-main-6, #h4s-main-7, #h4s-main-8, #h4s-main-9, #h4s-main-10");
        });
      
        $(".select-mode").click(function(){
          enb(".select-mode");
          dib("#" + this.id);
        });
      
        $("#sm-fff").click(function(){
          $(".h4-system").css("top","1920px");
          $("#h4s-fff").css("top","100px");
          mode = 1;
          upd("mode", mode);
        });
      
        var introduce_contestants_counter = 0;
        $("#h4s-fff-1").click(function(){
          if(introduce_contestants_counter == 0) {
            upd("sfx_introduce_contestants", 1);
            $(this).html("NC1");
            introduce_contestants_counter++;
          }
          else if(introduce_contestants_counter == 1) {
            upd("show_introduce_contestants", 1);
            upd("cont_to_introduce", 1);
            $(this).html("NC2");
            introduce_contestants_counter++;
          }
          else if(introduce_contestants_counter == 2) {
            upd("cont_to_introduce", 2);
            $(this).html("NC3");
            introduce_contestants_counter++;
          }
          else if(introduce_contestants_counter == 3) {
            upd("cont_to_introduce", 3);
            $(this).html("NC4");
            introduce_contestants_counter++;
          }
          else if(introduce_contestants_counter == 4) {
            upd("cont_to_introduce", 4);
            $(this).html("NC5");
            introduce_contestants_counter++;
          }
          else if(introduce_contestants_counter == 5) {
            upd("cont_to_introduce", 5);
            $(this).html("NC6");
            introduce_contestants_counter++;
          }
          else if(introduce_contestants_counter == 6) {
            upd("cont_to_introduce", 6);
            $(this).html("Ẩn");
            introduce_contestants_counter++;
          }
          else if(introduce_contestants_counter == 7) {
            upd("hide_introduce_contestants", 1);
            upd("cont_to_introduce", 1);
            $(this).html("GT người chơi");
            introduce_contestants_counter = 0;
          }
        });
      
        var fff_question_counter = 0;
        $("#h4s-fff-2").click(function(){
          if(fff_question_counter == 0) {
            UpdateFFFQuestionsData(1);
            
            upd("question_opacity", 1);
            upd("answer_a_opacity", 0);
            upd("answer_b_opacity", 0);
            upd("answer_c_opacity", 0);
            upd("answer_d_opacity", 0);
            upd("showing_fff_order", false);
            upd("sfx_fff_read_ques", 1);
            upd("reveal_fff_question", 1);
            
            ResetFFFResultsData();
            
            timer = 15;
            upd("timer", timer);
            
            $(this).html("Chạy đồng hồ");
            fff_question_counter++;
          }
          else if(fff_question_counter == 1) {
            upd("answer_a_opacity", 1);
            upd("answer_b_opacity", 1);
            upd("answer_c_opacity", 1);
            upd("answer_d_opacity", 1);
            dib("#h4s-fff-2");
            upd("sfx_fff_3_stabs", 1);
            
            setTimeout(function(){
              upd("sfx_fff_think", 1);
              upd("reveal_fff_answers", 1);
              upd("allow_answering_fff", 1);
              
              upd("enable_answering_fff", 1);
              
              PlayTimer(15);
              fff_epoch = Date.now();
            }, 1000);
            
            setTimeout(function(){
              fff_question_counter = 0;
              upd("hide_fff_q_and_a", 1);
              enb("#h4s-fff-3");
              upd("allow_answering_fff", 0);
            }, 16000);
          }
        });
      
        var fff_results_counter = 0;
        $("#h4s-fff-3").click(function(){
          if(fff_results_counter == 0) {
            upd("answer_a_opacity", 0);
            upd("answer_b_opacity", 0);
            upd("answer_c_opacity", 0);
            upd("answer_d_opacity", 0);
            upd("showing_fff_order", true);
            UpdateFFFQuestionsData(2);
            upd("reveal_fff_answer_orders", 1);
            upd("sfx_fff_read_ans", 1);
            $(this).html("Thứ tự 1");
            fff_results_counter++;
          }
          else if(fff_results_counter == 1) {
            upd("answer_a_opacity", 1);
            upd("sfx_fff_order_1", 1);
            upd("reveal_fff_order_1", 1);
            $(this).html("Thứ tự 2");
            fff_results_counter++;
          }
          else if(fff_results_counter == 2) {
            upd("answer_b_opacity", 1);
            upd("sfx_fff_order_2", 1);
            upd("reveal_fff_order_2", 1);
            $(this).html("Thứ tự 3");
            fff_results_counter++;
          }
          else if(fff_results_counter == 3) {
            upd("answer_c_opacity", 1);
            upd("sfx_fff_order_3", 1);
            upd("reveal_fff_order_3", 1);
            $(this).html("Thứ tự 4");
            fff_results_counter++;
          }
          else if(fff_results_counter == 4) {
            upd("answer_d_opacity", 1);
            upd("sfx_fff_order_4", 1);
            upd("reveal_fff_order_4", 1);
            $(this).html("Hiện kết quả");            
            fff_results_counter++;
          }
          else if(fff_results_counter == 5) {
            upd("reveal_fff_results", 1);
            $(this).html("Hiện ai đúng");
            fff_results_counter++;
          }
          else if(fff_results_counter == 6) {
            upd("sfx_fff_results", 1);
            
            FFFShowPlayerCorrect();
            
            $(this).html("Hiện thời gian");
            fff_results_counter++;
          }
          else if(fff_results_counter == 7) {
            upd("sfx_po10_reveal", 1);
            
            FFFShowPlayerCorrectTimes();
            CalculateFFFQuestionFastestPlayer();
            
            $(this).html("Ẩn kết quả");
            fff_results_counter++;
          }
          else if(fff_results_counter == 8){
            upd("hide_fff_results", 1);
            $(this).html("Hiện thứ tự");
            
            FFFAddResults();
            ResetFFFResultsData();
            CalculateFFFWinner();
            
            if(fff_auto_next_ques){
              $(".fff-next").click();
            }
            
            dib("#h4s-fff-3");
            enb("#h4s-fff-2");
            $("#h4s-fff-2").html("Hiện câu hỏi");
            fff_q_now++;
            upd("fff_q_now", fff_q_now);
            fff_results_counter = 0;
          }
        });
      
        var fff_scoreboard_counter = 0;
        $("#h4s-fff-4").click(function(){
          if(fff_scoreboard_counter == 0){
            upd("show_fff_scoreboard", 1);
            $(this).html("Hiện điểm");
            fff_scoreboard_counter++;
          }
          else if(fff_scoreboard_counter == 1){
            upd("show_fff_scoreboard_score", 1);
            upd("sfx_po10_reveal_short", 1);
            $(this).html("Hiện thời gian");
            fff_scoreboard_counter++;
          }
          else if(fff_scoreboard_counter == 2){
            upd("show_fff_scoreboard_times", 1);
            upd("sfx_po10_reveal_short", 1);
            
            CalculateFFFWinner();
            
            if(1 <= fff_winner && fff_winner <= 6) {
              $(this).html("Công bố");
              fff_scoreboard_counter = 3;
            }
            else{
              $(this).html("Ẩn BXH");
              fff_scoreboard_counter = 4;
            }
          }
          else if(fff_scoreboard_counter == 3){
            FFFShowWinner();
            upd("sfx_next_player_2", 1);
            if(auto_set_cheque_player){
              if (1 <= fff_winner && fff_winner <= 6) {
                cheque_player = fff_winner;
                upd("cheque_player", cheque_player);
              }
            }
            
            $(this).html("Ẩn BXH");
            fff_scoreboard_counter++;
          }
          else if(fff_scoreboard_counter == 4){
            for (var i = 1; i <= num_of_cs; i++) {
              fff_player_winner[i - 1] = false;
              upd("fff_player_winner_" + i, fff_player_winner[i - 1]);
              upd("fff_announce_winner_" + i, 0);
            }
            
            upd("hide_fff_scoreboard", 1);
            $(this).html("Hiện BXH");
            fff_scoreboard_counter = 0;
          }
        });
      
        $("#h4s-fff-5").click(function(){
          ResetFFFResultsData(true);
          
          fff_q_now = 1;
          upd("fff_q_now", fff_q_now);
        });
      
        $("#h4s-fff-6").click(function(){
          fff_auto_next_ques = !fff_auto_next_ques;
          
          if (fff_auto_next_ques){
            $(this).css("background-color", "green");
          }
          else{
            $(this).css("background-color", "black");
          }
        });
      
        $("#h4s-fff-7").click(function(){
          auto_set_cheque_player = !auto_set_cheque_player;
          
          if (auto_set_cheque_player){
            $(this).css("background-color", "green");
          }
          else{
            $(this).css("background-color", "black");
          }
        });
      
        $(".fff-player-enable").click(function(){
          var no = parseInt(this.id.substr(4));
          fff_player_enable[no - 1] = !fff_player_enable[no - 1];
          upd("fff_player_enable_" + no, fff_player_enable[no - 1]);
          if (fff_player_enable[no - 1] == true) {
            $(this).css("background-color", "green");
          }
          else {
            $(this).css("background-color", "red");
          }
        });
      
        $(".llo-activate").click(function(){
          var no = parseInt(this.id.substr(4));
          lifeline_on[no - 1] = !lifeline_on[no - 1];
          upd("lifeline_on_" + no, lifeline_on[no - 1]);
          if (lifeline_on[no - 1] == true) {
            $(this).css("background-color", "green");
          }
          else {
            $(this).css("background-color", "red");
          }
        });
      
        $(".llo-activate-pass").click(function(){
          lifeline_on_pass = !lifeline_on_pass;
          upd("lifeline_on_pass", lifeline_on_pass);
          if (lifeline_on_pass == true) {
            $(this).css("background-color", "green");
          }
          else {
            $(this).css("background-color", "red");
          }
        });
      
        var ll_holder_counter = 0;
        $(".ll-holder-toggle").click(function(){
          if(ll_holder_counter == 0) {
            if(!is_revealing_main_question){
              upd("sfx_reveal_2", 1);
            }
            upd("show_ll_holder", 1);
            $(this).html("Ẩn TTG");
            ll_holder_counter = 1;
          }
          else if(ll_holder_counter == 1) {
            upd("hide_ll_holder", 1);
            $(this).html("Hiện TTG");
            ll_holder_counter = 0;
          }
        });
      
        $("#sm-main").click(function(){
          $(".h4-system").css("top","1920px");
          $("#h4s-main").css("top","100px");
          mode = 2;
          upd("mode", mode);
        });
      
        $("#h4s-main-1").click(function(){
          upd("sfx_lights_down", 1);
        });
      
        var question_reveal_counter = 0;
        $("#h4s-main-2").click(function(){
          if(question_reveal_counter == 0) {
            upd("question_winnings", mt_value[q_now - 1]);
            
            upd("question_opacity", 1);
            upd("answer_a_opacity", 0);
            upd("answer_b_opacity", 0);
            upd("answer_c_opacity", 0);
            upd("answer_d_opacity", 0);
            
            SetupFFLifeline(1);
            SetupSTQLifeline(1);
            
            UpdateMainQuestionsData(1);
            
            timer = secs[q_now - 1];
            upd("timer", timer);
            
            is_revealing_main_question = true;
            upd("reveal_main_question", 1);
            
            upd("sfx_q_bed", 1);
            
            $(this).html("Hiện đáp án A");
            
            question_reveal_counter++;
          }
          else if(question_reveal_counter == 1) {
            upd("answer_a_opacity", 1);
            
            upd("reveal_main_answer_a", 1);
            $(this).html("Hiện đáp án B");
            
            question_reveal_counter++;
          }
          else if(question_reveal_counter == 2) {
            upd("answer_b_opacity", 1);
            
            upd("reveal_main_answer_b", 1);
            $(this).html("Hiện đáp án C");
            
            question_reveal_counter++;
          }
          else if(question_reveal_counter == 3) {
            upd("answer_c_opacity", 1);
            
            upd("reveal_main_answer_c", 1);
            $(this).html("Hiện đáp án D");
            
            question_reveal_counter++;
          }
          else if(question_reveal_counter == 4) {
            upd("answer_d_opacity", 1);
            
            upd("reveal_main_answer_d", 1);
            $(this).html("Hiện câu hỏi");
            dib("#h4s-main-2");
            enb("#h4s-main-5, #h4s-main-6, #h4s-main-7, #h4s-main-8");
            
            question_reveal_counter = 0;
          }
        });
      
        $("#h4s-main-3").click(function(){
          if(timer_counter == 0) {
            PlayTimer(secs[q_now - 1]);
            upd("timer_secs", secs[q_now - 1]);
            upd("play_timer", 1);
            if(lifeline_on_pass == false) {
              upd("reveal_no_pass", 1);
            }
            $(this).html("Dừng đồng hồ");
            timer_counter++;
            upd("sfx_timer", 1);
          }
          else if(timer_counter == 1) {
            upd("stop_timer", 1);
            PauseTimer();
            if(lifeline_on_pass == false) {
              upd("hide_no_pass", 1);
            }
            $(this).html("Chạy đồng hồ");
            timer_counter = 0;
            upd("sfx_stop_timer", 1);
          }
        });
      
        var pass_counter = 0;
        $("#h4s-main-4").click(function(){
          if(pass_counter == 0){
            upd("sfx_pass", 1);
            upd("sfx_reveal_pass", 1);
            
            lifeline_on_pass = false;
            upd("lifeline_on_pass", lifeline_on_pass);
            $(".llo-activate-pass").css("background-color", "red");
            
            upd("stop_timer", 1);
            PauseTimer();
            if(lifeline_on_pass == false) {
              upd("hide_no_pass", 1);
            }
            $("#h4s-main-3").html("Chạy đồng hồ");
            timer_counter = 0;
            $(this).html("Ẩn câu hỏi");
            dib("#h4s-main-5, #h4s-main-6, #h4s-main-7, #h4s-main-8");
            pass_counter++;
            
            var next_cont = cont_now;
            var cnt = 0;

            while (cnt + 1 <= num_of_cs) {
              cnt++;
              next_cont++;
              next_cont %= num_of_cs;
              if(next_cont == 0) {
                next_cont = num_of_cs;
              }
              if (available_players[next_cont - 1] == true) {
                break;
              }
            }

            upd("next_cont_id", next_cont);
            
            upd("next_cont_info_opacity", 1);
          }
          else if(pass_counter == 1) {
            upd("temp_hide_main_question", 1);
            is_revealing_main_question = false;
            $(this).html("NC tiếp");
            pass_counter++;
          }
          else if(pass_counter == 2) {
            upd("sfx_next_player_3", 1);
            upd("next_cont_info_opacity", 0);
            
            NextPlayer();
            
            $(this).html("Hiện câu hỏi");
            pass_counter++;
          }
          else if(pass_counter == 3) {
            upd("temp_reveal_main_question", 1);
            is_revealing_main_question = true;
            
            enb("#h4s-main-5, #h4s-main-6, #h4s-main-7, #h4s-main-8");
            
            upd("sfx_q_bed", 1);
            
            timer = secs[q_now - 1];
            upd("timer", timer);
            $(this).html("Chuyển");
            pass_counter = 0;
          }
        });
      
        $("#h4s-main-5").click(function(){
          if (answer_fifty_fifty_a) {
            ForbiddenButton("#" + this.id);
          }
          else {
            final_ans = "a";
            upd("final_ans", final_ans);
            correct_ans = main_questions[main_q_using - 1].CorrectAns;

            if(timer_counter == 1) {
              $("#h4s-main-3").click();
            }
            upd("sfx_final_answer", 1);
            upd("reveal_final_ans_a", 1);
            UpdateMainQuestionsData(2);
            dib("#h4s-main-5, #h4s-main-6, #h4s-main-7, #h4s-main-8");
            enb("#h4s-main-9, #h4s-main-10");
          }
        });
        $("#h4s-main-6").click(function(){
          if (answer_fifty_fifty_b) {
            ForbiddenButton("#" + this.id);
          }
          else {
            final_ans = "b";
            upd("final_ans", final_ans);
            correct_ans = main_questions[main_q_using - 1].CorrectAns;

            if(timer_counter == 1) {
              $("#h4s-main-3").click();
            }
            upd("sfx_final_answer", 1);
            upd("reveal_final_ans_b", 1);
            UpdateMainQuestionsData(2);
            dib("#h4s-main-5, #h4s-main-6, #h4s-main-7, #h4s-main-8");
            enb("#h4s-main-9, #h4s-main-10");
          }
        });
        $("#h4s-main-7").click(function(){
          if (answer_fifty_fifty_c) {
            ForbiddenButton("#" + this.id);
          }
          else {
            final_ans = "c";
            upd("final_ans", final_ans);
            correct_ans = main_questions[main_q_using - 1].CorrectAns;

            if(timer_counter == 1) {
              $("#h4s-main-3").click();
            }
            upd("sfx_final_answer", 1);
            upd("reveal_final_ans_c", 1);
            UpdateMainQuestionsData(2);
            dib("#h4s-main-5, #h4s-main-6, #h4s-main-7, #h4s-main-8");
            enb("#h4s-main-9, #h4s-main-10");
          }
        });
        $("#h4s-main-8").click(function(){
          if (answer_fifty_fifty_d) {
            ForbiddenButton("#" + this.id);
          }
          else {
            final_ans = "d";
            upd("final_ans", final_ans);
            correct_ans = main_questions[main_q_using - 1].CorrectAns;

            if(timer_counter == 1) {
              $("#h4s-main-3").click();
            }
            upd("sfx_final_answer", 1);
            upd("reveal_final_ans_d", 1);
            UpdateMainQuestionsData(2);
            dib("#h4s-main-5, #h4s-main-6, #h4s-main-7, #h4s-main-8");
            enb("#h4s-main-9, #h4s-main-10");
          }
        });
        $("#h4s-main-9").click(function(){
          final_ans = "";
          upd("final_ans", final_ans);
          correct_ans = "";
          upd("final_ans_undo", 1);
          
          upd("stop_music_undo", 1);
          upd("sfx_q_bed", 1);
          UpdateMainQuestionsData(1);
          enb("#h4s-main-5, #h4s-main-6, #h4s-main-7, #h4s-main-8");
          dib("#h4s-main-9, #h4s-main-10");
        });
      
        var correct_answer_counter = 0;
      
        $("#h4s-main-10").click(function(){
          if(correct_answer_counter == 0) {
            SetupFFLifeline(2);
          
            UpdateMainQuestionsData(3);
            
            SetupSTQLifeline(2);
            dib("#h4s-main-5, #h4s-main-6, #h4s-main-7, #h4s-main-8, #h4s-main-9");
            upd("reveal_correct_ans_" + correct_ans, 1);
            if (final_ans == correct_ans){
              upd("sfx_correct", 1);
              if (q_now == q_top) {
                $(this).html("Ẩn câu hỏi");
              }
              else{
                $(this).html("Hiện tiền");
              }
            }
            else{
              upd("sfx_wrong", 1);
              upd("next_cont_info_opacity", 1);
              $(this).html("Ẩn câu hỏi");
            }
            correct_answer_counter++;
          }
          else if(correct_answer_counter == 1) {
            upd("hide_main_question", 1);
            is_revealing_main_question = false;
            if (final_ans == correct_ans){
              if (q_now == q_top) {
                upd("total_winnings", mt_value[q_now - 1]);
                $(".q-now-up").click();
                $(this).html("Tổng tiền");
                
                dib("#h4s-main-11");
                
                correct_answer_counter = 4;
              }
              else{
                setTimeout(function(){
                  upd("reveal_money_strap", 1);
                  if (q_now < 5) {
                    upd("sfx_po10_reveal", 1);
                  }
                }, 250);
                $(this).html("Ẩn tiền");
                correct_answer_counter = 3;
              }
            }
            else{
              if (q_now == q_top || q_top == 10) {
                $(this).html("Công bố");
                dib("#h4s-main-10");
                correct_answer_counter = 0;
              }
              else{
                $(this).html("NC tiếp");
                correct_answer_counter = 2;
              }
            }
          }
          else if(correct_answer_counter == 2) {
            if (true) {
              $(".q-top-down").click();
              $(".main-next").click();
            }
            upd("sfx_next_player_3", 1);
            upd("next_cont_info_opacity", 0);
            
            if (available_players[cont_now - 1] == true) {
              $("#h4s-main-" + (cont_now + 19)).click();
            }
            
            NextPlayer();
            
            $(this).html("Công bố");
            dib("#h4s-main-10");
            if(!is_a_round_played) {
              lifeline_on_pass = true;
              upd("lifeline_on_pass", lifeline_on_pass);
              $(".llo-activate-pass").css("background-color","green");
            }
            correct_answer_counter = 0;
          }
          else if(correct_answer_counter == 3) {
            if (true) {
              $(".q-now-up").click();
              $(".main-next").click();
            }
            upd("hide_money_strap", 1);
            $(this).html("Công bố");
            dib("#h4s-main-10");
            if(!is_a_round_played) {
              lifeline_on_pass = true;
              upd("lifeline_on_pass", lifeline_on_pass);
              $(".llo-activate-pass").css("background-color","green");
            }
            correct_answer_counter = 0;
          }
          else if(correct_answer_counter == 4) {
            upd("reveal_total_money_strap", 1);
            upd("sfx_po10_reveal", 1);
            $(this).html("Ẩn tổng tiền");
            correct_answer_counter++;
          }
          else if(correct_answer_counter == 5){ 
            upd("hide_total_money_strap", 1);
            $(this).html("Công bố");
            dib("#h4s-main-10");
            
            enb("#h4s-main-11");
            
            correct_answer_counter = 0;
          }
        });
      
        var total_money_strap_counter = 0;
        $("#h4s-main-11").click(function(){
          if(total_money_strap_counter == 0) {
            upd("reveal_total_money_strap", 1);
            upd("sfx_po10_reveal", 1);
            $(this).html("Ẩn tổng tiền");
            total_money_strap_counter++;
          }
          else if (total_money_strap_counter == 1) {
            upd("hide_total_money_strap", 1);
            $(this).html("Tổng tiền");
            total_money_strap_counter = 0;
          }
        });
      
        var commercial_counter = 0;
        $("#h4s-main-12").click(function(){
          if (is_revealing_main_question) {
            if (commercial_counter == 0) {
              upd("temp_hide_main_question", 1);
              upd("stop_music_for_comm", 1);
              $(this).html("Vào QC");
              commercial_counter++;
            }
            else if (commercial_counter == 1) {
              $("#sfx_bumper_out").click();
              upd("reveal_comm_strap", 1);
              $(this).html("Ẩn thanh");
              commercial_counter++;
            }
            else if (commercial_counter == 2) {
              upd("hide_comm_strap", 1);
              $(this).html("Hết QC");
              commercial_counter++;
            }
            else if (commercial_counter == 3) {
              $("#sfx_bumper_out").click();
              upd("reveal_comm_strap", 1);
              $(this).html("Ẩn thanh");
              commercial_counter++;
            }
            else if (commercial_counter == 4) {
              upd("hide_comm_strap", 1);
              $(this).html("Hiện câu hỏi");
              commercial_counter++;
            }
            else if (commercial_counter == 5) {
              upd("temp_reveal_main_question", 1);
              //upd("play_music_after_comm", 1);
              if(q_now <= 5 || final_ans == "") {
                upd("sfx_q_bed", 1);
              }
              else{
                upd("sfx_final_answer", 1);
              }
              $(this).html("Quảng cáo");
              commercial_counter = 0;
            }
          }
          else {
            if (commercial_counter == 0) {
              $("#sfx_bumper_out").click();
              upd("reveal_comm_strap", 1);
              $(this).html("Ẩn thanh");
              commercial_counter++;
            }
            else if (commercial_counter == 1) {
              upd("hide_comm_strap", 1);
              $(this).html("Hết QC");
              commercial_counter++;
            }
            else if (commercial_counter == 2) {
              $("#sfx_bumper_out").click();
              upd("reveal_comm_strap", 1);
              $(this).html("Ẩn thanh");
              commercial_counter++;
            }
            else if (commercial_counter == 3) {
              upd("hide_comm_strap", 1);
              $(this).html("Quảng cáo");
              commercial_counter = 0;
            }
          }
        });
      
        $("#h4s-main-13").click(function(){
          UpdateMainQuestionsData(0);
          upd("answer_a_opacity", 0);
          upd("answer_b_opacity", 0);
          upd("answer_c_opacity", 0);
          upd("answer_d_opacity", 0);
          
          answer_fifty_fifty_a = false;
          answer_fifty_fifty_b = false;
          answer_fifty_fifty_c = false;
          answer_fifty_fifty_d = false;

          upd("answer_fifty_fifty_a", answer_fifty_fifty_a);
          upd("answer_fifty_fifty_b", answer_fifty_fifty_b);
          upd("answer_fifty_fifty_c", answer_fifty_fifty_c);
          upd("answer_fifty_fifty_d", answer_fifty_fifty_d);
          
          timer = 0;
          upd("timer", timer);
        });
      
        $("#h4s-main-14").click(function(){
          q_now = 1;
          upd("q_now", 1);
          q_top = 15;
          upd("q_top", 15);
          $("#qnf-1").click();
          $("#qtf-15").click();
          is_a_round_played = false;
          upd("is_a_round_played", false);
          cont_now = 1;
          upd("cont_now", 1);
          cheque_player = 0;
          upd("cheque_player", 0);
          upd("question_winnings", 0);
          upd("total_winnings", 0);
          
          c_left = 6;
          upd("c_left", c_left);
          
          available_players = [true, true, true, true, true, true];
          $(".ap-button").css("background-color", "green");
          
          $("#h4s-main-13").click();
        });
      
        var top_money_strap_counter = 0;
        $("#h4s-main-15").click(function(){
          if (top_money_strap_counter == 0) {
            dib("#h4s-main-15, #h4s-main-16, #h4s-main-17, #h4s-main-18, #h4s-main-19");
            enb("#h4s-main-15");
            upd("sfx_reveal_2", 1);
            upd("reveal_top_money_strap_14", 1);
            $(this).html("Ẩn");
            top_money_strap_counter++;
          }
          else if(top_money_strap_counter == 1) {
            enb("#h4s-main-15, #h4s-main-16, #h4s-main-17, #h4s-main-18, #h4s-main-19");
            $(this).html("14");
            upd("hide_top_money_strap", 1);
            top_money_strap_counter = 0;
          }
        });
      
        $("#h4s-main-16").click(function(){
          if (top_money_strap_counter == 0) {
            dib("#h4s-main-15, #h4s-main-16, #h4s-main-17, #h4s-main-18, #h4s-main-19");
            enb("#h4s-main-16");
            upd("sfx_reveal_2", 1);
            upd("reveal_top_money_strap_13", 1);
            $(this).html("Ẩn");
            top_money_strap_counter++;
          }
          else if(top_money_strap_counter == 1) {
            enb("#h4s-main-15, #h4s-main-16, #h4s-main-17, #h4s-main-18, #h4s-main-19");
            $(this).html("13");
            upd("hide_top_money_strap", 1);
            top_money_strap_counter = 0;
          }
        });
      
        $("#h4s-main-17").click(function(){
          if (top_money_strap_counter == 0) {
            dib("#h4s-main-15, #h4s-main-16, #h4s-main-17, #h4s-main-18, #h4s-main-19");
            enb("#h4s-main-17");
            upd("sfx_reveal_2", 1);
            upd("reveal_top_money_strap_12", 1);
            $(this).html("Ẩn");
            top_money_strap_counter++;
          }
          else if(top_money_strap_counter == 1) {
            enb("#h4s-main-15, #h4s-main-16, #h4s-main-17, #h4s-main-18, #h4s-main-19");
            $(this).html("12");
            upd("hide_top_money_strap", 1);
            top_money_strap_counter = 0;
          }
        });
      
        $("#h4s-main-18").click(function(){
          if (top_money_strap_counter == 0) {
            dib("#h4s-main-15, #h4s-main-16, #h4s-main-17, #h4s-main-18, #h4s-main-19");
            enb("#h4s-main-18");
            upd("sfx_reveal_2", 1);
            upd("reveal_top_money_strap_11", 1);
            $(this).html("Ẩn");
            top_money_strap_counter++;
          }
          else if(top_money_strap_counter == 1) {
            enb("#h4s-main-15, #h4s-main-16, #h4s-main-17, #h4s-main-18, #h4s-main-19");
            $(this).html("11");
            upd("hide_top_money_strap", 1);
            top_money_strap_counter = 0;
          }
        });
      
        $("#h4s-main-19").click(function(){
          if (top_money_strap_counter == 0) {
            dib("#h4s-main-15, #h4s-main-16, #h4s-main-17, #h4s-main-18, #h4s-main-19");
            enb("#h4s-main-19");
            upd("sfx_reveal_2", 1);
            upd("reveal_top_money_strap_10", 1);
            $(this).html("Ẩn");
            top_money_strap_counter++;
          }
          else if(top_money_strap_counter == 1) {
            enb("#h4s-main-15, #h4s-main-16, #h4s-main-17, #h4s-main-18, #h4s-main-19");
            $(this).html("10");
            upd("hide_top_money_strap", 1);
            top_money_strap_counter = 0;
          }
        });
      
        $(".ap-button").click(function(){
          var idname = "#" + $(this).attr("id");
          var id = parseInt($(idname).html());
          available_players[id - 1] = !available_players[id - 1];
          if (available_players[id - 1] == true) {
            c_left++;
            upd("c_left", c_left);
            $(idname).css("background-color", "green");
          }
          else{
            c_left--;
            upd("c_left", c_left);
            $(idname).css("background-color", "red");
          }
        });
      
        con.RenderControllerMoneytree = function(num_of_qs, now, top, milestone) {
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
                htmlMTString += '<div class="moneyTd" id="moneyTd-c-cm">';
              }
              else {
                htmlMTString += '<div class="moneyTd" id="moneyTd-c-cn">';
              }
            }
            else if (i > top) {
              htmlMTString += '<div class="moneyTd" id="moneyTd-c-et3">';
            }
            else if (i == top) {
              htmlMTString += '<div class="moneyTd" id="moneyTd-c-lp">';
            }
            else if (now < i && i < top) {
              htmlMTString += '<div class="moneyTd" id="moneyTd-c-t">';
            }
            else if(i == now) {
              htmlMTString += '<div class="moneyTd" id="moneyTd-c-now">';
            }
            htmlMTString += txt;
            htmlMTString += '</div>';
            htmlMTString += '</div>';
          }
          
          $(".moneytree").html(htmlMTString);
        }
      
        $(".q-top-follower-set").click(function(){
          var no = parseInt(this.id.substr(4));
          $(".q-top-follower-set").css("background-color", "black");
          $(this).css("background-color", "yellow");
          q_top_follower = no;
          upd("q_top_follower", q_top_follower);
        });
      
        $(".q-now-follower-set").click(function(){
          var no = parseInt(this.id.substr(4));
          $(".q-now-follower-set").css("background-color", "black");
          $(this).css("background-color", "aqua");
          q_now_follower = no;
          upd("q_now_follower", q_now_follower);
        });
      
        function RenderMTFT(){          
          var htmlMTFTString = "";
          for (var i = num_of_qs; i >= 1; i--) {
            htmlMTFTString += '<div class="mt-follower-toggle" id="mtft-' + i + '">';
            if (i >= 10) {
              htmlMTFTString += '<button class="q-top-follower-set" id="qtf-' + i + '"></button>';
            }
            htmlMTFTString += '<button class="q-now-follower-set" id="qnf-' + i + '"></button>';
            htmlMTFTString += '</div>';
          }
          $(".mt-follower-toggle-holder").html(htmlMTFTString);
        }
      
        $(".auto-set-follower").click(function(){
          auto_set_follower = !auto_set_follower;
          
          if (auto_set_follower){
            $(this).css("background-color", "green");
          }
          else{
            $(this).css("background-color", "black");
          }
        });
      
        $(".q-top-up").click(function(){
          if(10 <= q_top + 1 && q_top + 1 <= 15) {
            q_top++;
            upd("q_top", q_top);
            if (auto_set_follower) {
              $("#qtf-" + q_top).click();
            }
          }
        });
        $(".q-top-down").click(function(){
          if(10 <= q_top - 1 && q_top - 1 <= 15) {
            q_top--;
            upd("q_top", q_top);
            if (auto_set_follower) {
              $("#qtf-" + q_top).click();
            }
          }
        });
        $(".q-now-up").click(function(){
          if(1 <= q_now + 1 && q_now + 1 <= 16) {
            q_now++;
            upd("q_now", q_now);
            if (auto_set_follower) {
              $("#qnf-" + q_now).click();
            }
            if(q_now > q_top) {
              upd("total_winnings", mt_value[q_top - 1]);
            }
            else if(q_now > q_milestone) {
              upd("total_winnings", mt_value[q_milestone - 1]);
            }
            else{
              upd("total_winnings", 0);
            }
          }
        });
        $(".q-now-down").click(function(){
          if(1 <= q_now - 1 && q_now - 1 <= 16) {
            q_now--;
            upd("q_now", q_now);
            if (auto_set_follower) {
              $("#qnf-" + q_now).click();
            }
            if(q_now > q_top) {
              upd("total_winnings", mt_value[q_top - 1]);
            }
            else if(q_now > q_milestone) {
              upd("total_winnings", mt_value[q_milestone - 1]);
            }
            else{
              upd("total_winnings", 0);
            }
          }
        });
      
        $(".ll-window-open").click(function(){
          var id = "#llwic-" + this.id.substr(5);
          $(".llw-inner-content").css("transform","translateY(1920px)");
          $(id).css("transform","translateY(0px)");
          con.TextUpdateData(".llw-title", $(this).html(), 1);
        });
      
        $(".message-to-host-submit").click(function(){
          upd("controller_message", $(".message-to-host").val());
        });
      
        //
      
        Init();
        $(".to-main").click();
      
        $("#h4s-fff-6").click();
        $("#h4s-fff-7").click();
        $(".auto-set-follower").click();
      
        //RenderMTFT();
        $("#qtf-15").click();
        $("#qnf-1").click();
      
        //

        onValue(ref(db, dbKey), (snapshot) => {
            const data = snapshot.val();
          
            // Question & Answers
          
            if(data.question_line_2 == ".") {
              $(".question").html(data.question_line_1);
            }
            else{
              var len = data.question_line_1.length;
              if (len > 0 && data.question_line_1[len - 1] != " ") {
                $(".question").html(data.question_line_1 + " " + data.question_line_2);
              }
              else {
                $(".question").html(data.question_line_1 + data.question_line_2);
              }
            }
          
            if (data.showing_fff_order == true) {
              $("#ans-letter-a").html(data.correct_order_1.toUpperCase());
              $("#ans-letter-b").html(data.correct_order_2.toUpperCase());
              $("#ans-letter-c").html(data.correct_order_3.toUpperCase());
              $("#ans-letter-d").html(data.correct_order_4.toUpperCase());
              
              $("#ans-text-a").html(eval("data.answer_" + data.correct_order_1));
              $("#ans-text-b").html(eval("data.answer_" + data.correct_order_2));
              $("#ans-text-c").html(eval("data.answer_" + data.correct_order_3));
              $("#ans-text-d").html(eval("data.answer_" + data.correct_order_4));
              
              $(".ans-letter").css("color", "lime");
              
              //console.log(eval("data.answer_" + data.correct_order_1));
              //console.log(eval("data.answer_" + data.correct_order_2));
              //console.log(eval("data.answer_" + data.correct_order_3));
              //console.log(eval("data.answer_" + data.correct_order_4));
            } 
            else {
              $("#ans-letter-a").html("A");
              $("#ans-letter-b").html("B");
              $("#ans-letter-c").html("C");
              $("#ans-letter-d").html("D");
              
              $("#ans-text-a").html(data.answer_a);
              $("#ans-text-b").html(data.answer_b);
              $("#ans-text-c").html(data.answer_c);
              $("#ans-text-d").html(data.answer_d);
              
              $(".ans-letter").css("color", "aqua");
              
              if(data.correct_ans == "a") {
                $("#ans-letter-a").css("color", "lime");
              }
              else if(data.correct_ans == "b") {
                $("#ans-letter-b").css("color", "lime");
              }
              else if(data.correct_ans == "c") {
                $("#ans-letter-c").css("color", "lime");
              }
              else if(data.correct_ans == "d") {
                $("#ans-letter-d").css("color", "lime");
              }
            }
          
            if (data.answer_fifty_fifty_a == true) {
              $("#ans-letter-a, #ans-text-a").css("opacity", 0.25);
            }
            else {
              $("#ans-letter-a, #ans-text-a").css("opacity", 1);
            }
            if (data.answer_fifty_fifty_b == true) {
              $("#ans-letter-b, #ans-text-b").css("opacity", 0.25);
            }
            else {
              $("#ans-letter-b, #ans-text-b").css("opacity", 1);
            }
            if (data.answer_fifty_fifty_c == true) {
              $("#ans-letter-c, #ans-text-c").css("opacity", 0.25);
            }
            else {
              $("#ans-letter-c, #ans-text-c").css("opacity", 1);
            }
            if (data.answer_fifty_fifty_d == true) {
              $("#ans-letter-d, #ans-text-d").css("opacity", 0.25);
            }
            else {
              $("#ans-letter-d, #ans-text-d").css("opacity", 1);
            }
          
            // Info
          
            $(".q-left-info").html("Số câu hỏi còn lại: " + (data.q_top - data.q_now + 1));   
            $(".c-left-info").html("Số người chơi hiện tại: " + data.c_left);
          
            $(".c-now-info").html("Người chơi hiện tại: " + data.cont_now + ". " + eval("data.cont_name_" + data.cont_now));
            if(1 <= data.cheque_player && data.cheque_player <= 6) {
              $(".cp-now-info").html("Người cầm séc hiện tại: " + data.cheque_player + ". " + eval("data.cont_name_" + data.cheque_player));
            }
            else{
              $(".cp-now-info").html("Người cầm séc hiện tại: ");
            }
          
            $(".ar-info").html("Đã chơi được một vòng chưa: " + data.is_a_round_played);
            $(".qw-info").html("Giải thưởng câu hỏi: " + accounting.formatMoney(data.question_winnings));
            $(".tw-info").html("Giải thưởng chắc chắn: " + accounting.formatMoney(data.total_winnings));
          
            $(".fff-q-now-info").html("Câu hỏi BBPN hiện tại: " + data.fff_q_now);
            $(".time-left-info").html("Thời gian còn lại: " + data.timer);
          
            // FFF Table
          
            for (var i=1;i<=num_of_cs;i++) {
              con.TextUpdateData(".frt-"+i+" .frt-name",eval("data.cont_name_"+i),1);
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
            
            // Get FFF Answers Data
          
            for (var i = 1; i <= num_of_cs; i++) {
              if(eval("data.fff_player_submit_" + i) == 1) {
                upd("fff_player_submit_" + i, 0);
                var time_now = Date.now();
                fff_player_times[i - 1] = parseFloat(((time_now - fff_epoch) / 1000).toFixed(2));
                
                if (0 <= fff_player_times[i - 1] && fff_player_times[i - 1] <= 15) {
                  upd("fff_times_" + i, fff_player_times[i - 1]);
                  var ok = 1;
                  
                  var r = fff_q_using - 1;
                  if (fff_questions[r].CorrectOrder_One != eval("data.fff_answer_" + i)[0]) {
                    ok = 0;
                  }
                  if (fff_questions[r].CorrectOrder_Two != eval("data.fff_answer_" + i)[1]) {
                    ok = 0;
                  }
                  if (fff_questions[r].CorrectOrder_Three != eval("data.fff_answer_" + i)[2]) {
                    ok = 0;
                  }
                  if (fff_questions[r].CorrectOrder_Four != eval("data.fff_answer_" + i)[3]) {
                    ok = 0;
                  }
                  
                  if (ok == 1) {
                    fff_player_correct[i - 1] = true;
                  }
                  else {
                    fff_player_correct[i - 1] = false;
                  }
                    
                  //upd("fff_player_correct_" + i, fff_player_correct[i - 1]);
                  
                }
                else {
                  upd("fff_answer_" + i, "");
                  upd("fff_times_" + i, 0);
                }
              }
            }
          
            // Main
          
            $(".main-time-left-info").html("Thời gian còn lại: " + data.timer);
          
            if(data.lifeline_on_pass == false){
              $("#ll-pass .ll-used").css("opacity", 1);
            }
            else{
              $("#ll-pass .ll-used").css("opacity", 0);
            }
          
            for (var i = 1; i <= 2; i++) {
              if(eval("data.lifeline_on_" + i) == false){
                $("#ll-" + i + " .ll-used").css("opacity", 1);
              }
              else{
                $("#ll-" + i + " .ll-used").css("opacity", 0);
              }
            }
          
            con.RenderControllerMoneytree(data.num_of_qs, data.q_now_follower, data.q_top_follower, [data.q_milestone]);
            for (var i = 1; i <= data.num_of_qs; i++) {
              var value = 0;
              if(eval("data.mt_value_" + i) != undefined){
                value = eval("data.mt_value_" + i);
              }
              if (value != null && $("#moneyTr-" + i + " .moneyTd").length) {
                con.TextUpdateData("#moneyTr-" + i + " .moneyTd .moneyTd-prize", accounting.formatMoney(value), 1);
              }
            }
          
            con.TextUpdateData(".q-now-toggle", "Câu hỏi hiện tại: " + data.q_now);          
            con.TextUpdateData(".q-top-toggle", "Mốc tối đa: " + data.q_top);
          
            $(".question-note").html(data.note);    
        });    

    }(window.CONTROLLER = window.CONTROLLER || {}));
});