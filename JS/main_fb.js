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
      
        var is_timer_running = false;
      
        //

        $.keyframe.define([
          {
            name: 'reset'
          },
          {
            name: 'timer-red-move',
            '0%': {
              "clip-path": "inset(0 100% 0 0)"
            },
            '100%': {
              "clip-path": "inset(0 0% 0 0)"
            }
          },
          {
            name: 'question-move-up',
            '0%': {
              "perspective": "4096",
              "transform": "translateY(375px) rotateX(90deg) scale(1.5)"
            },
            '100%': {
              "perspective": "4096",
              "transform": "translateY(200px) rotateX(0deg) scale(1)"
            }
          },
          {
            name: 'question-move-up-2',
            '0%': {
              "transform": "translateY(200px)"
            },
            '100%': {
              "transform": "translateY(0px)"
            }
          },
          {
            name: 'answer-move-up',
            '0%': {
              "transform": "translateY(400px)"
            },
            '100%': {
              "transform": "translateY(0px)"
            }
          },
          {
            name: 'answer-move-from-left',
            '0%': {
              "transform": "translateX(-960px)"
            },
            '100%': {
              "transform": "translateX(0px)"
            }
          },
          {
            name: 'answer-move-from-right',
            '0%': {
              "transform": "translateX(960px)"
            },
            '100%': {
              "transform": "translateY(0px)"
            }
          },
          {
            name: 'q-and-a-move-down',
            '0%': {
              "transform": "translateY(0px)"
            },
            '100%': {
              "transform": "translateY(400px)"
            }
          },
          {
            name: 'q-and-a-fade-in',
            '0%': {
              "opacity": "0",
              "transform": "translateY(0px)"
            },
            '100%': {
              "opacity": "1",
              "transform": "translateY(0px)"
            }
          },
          {
            name: 'money-text-reveal',
            '0%': {
              "clip-path": "inset(0 50% 0 50%)"
            },
            '100%': {
              "clip-path": "inset(0 0% 0 0%)"
            }
          },
          {
            name: 'old-top-money-text-hide',
            '0%': {
              "clip-path": "inset(0 0 0 0%)"
            },
            '100%': {
              "clip-path": "inset(0 0 0 100%)"
            }
          },
          {
            name: 'top-money-text-reveal',
            '0%': {
              "clip-path": "inset(0 100% 0 0)"
            },
            '100%': {
              "clip-path": "inset(0 0% 0 0)"
            }
          },
          {
            name: 'lifeline-holder-reveal',
            '0%': {
              "opacity": "1",
              "transform": "translateY(100px) rotateX(-90deg)"
            },
            '100%': {
              "opacity": "1",
              "transform": "translateY(0px) rotateX(0deg)"
            }
          },
          {
            name: 'lifeline-holder-hide',
            '0%': {
              "opacity": "1",
              "transform": "translateY(0px) rotateX(0deg)"
            },
            '100%': {
              "opacity": "1",
              "transform": "translateY(100px) rotateX(-90deg)"
            }
          }
        ]);
      
        con.ResetTimer = function(){
          //$("#timer-red").playKeyframe("reset");
          $('.sparkle').stop().animate({"left":"-4%"}, 0);
          is_timer_running = false;
        }
      
        con.StopAndHideTimer = function(){
          $("#timer-red").pauseKeyframe();
          $('.sparkle').stop().animate({"opacity":0}, 100);
          setTimeout(function(){
            $(".timer").animate({"opacity":0}, 500);
            is_timer_running = false;
          }, 500);
        }
      
        con.RevealAndPlayTimer = function(sec){
          con.ResetTimer();
          is_timer_running = true;
          $(".timer, .sparkle").css('opacity',1);
          var secs = sec + 's';
          $("#timer-red").playKeyframe({
            name: 'timer-red-move',
            duration: secs,
            timingFunction: 'linear'
          })
          $('.sparkle').animate({"left":"94.5%"}, sec*1000, "linear", function(){
            if (is_timer_running) {
              con.StopAndHideTimer();
            }
          });
        }
      
        con.ResetQuestion = function(){
          $(".ans-letter, .ans-text, .ans-diagonal, .ans-final, .ans-correct, .no-pass").css("opacity", 0);
          $(".ans-main").css("opacity", 1);
          $(".ans-letter svg text").attr("fill", "#fff3ba");
          $(".ans-text svg text").attr("fill", "white");
          $(".ans-letter svg").css("text-shadow", "2px 2px 2px rgba(0,0,0,1)");
          $(".ans-text svg").css("text-shadow", "2px 2px 2px rgba(0,0,0,1)");
          $(".question, .answer").css("transform","translateY(400px)").playKeyframe("reset");
          con.ResetTimer();
        }
      
        con.RevealQuestion = function(){
          $(".question").playKeyframe({
            name: 'question-move-up',
            duration: "1s",
            timingFunction: 'ease'
          });
        }
      
        con.RevealAllAnswers = function(){
          $(".ans-letter, .ans-text, .ans-diagonal").css('opacity', 1);
          $(".question").playKeyframe({
            name: 'question-move-up-2',
            duration: "0.3s",
            timingFunction: 'linear'
          });
          setTimeout(function(){
            $("#answer-a").playKeyframe({
              name: 'answer-move-from-left',
              duration: "0.75s",
              timingFunction: 'ease'
            });
            setTimeout(function(){
              $("#answer-b").playKeyframe({
                name: 'answer-move-from-right',
                duration: "0.75s",
                timingFunction: 'ease'
              });
            }, 100);
            setTimeout(function(){
              $("#answer-c").playKeyframe({
                name: 'answer-move-from-left',
                duration: "0.75s",
                timingFunction: 'ease'
              });
            }, 200);
            setTimeout(function(){
              $("#answer-d").playKeyframe({
                name: 'answer-move-from-right',
                duration: "0.75s",
                timingFunction: 'ease'
              });
            }, 300);
          }, 250);
        }
      
        con.ResetAnswerFC = function(answer = "") {
          if (answer == "") {
            $(".ans-main").css("opacity", 1);
            $(".ans-final").css("opacity", 0);
            $(".ans-correct").css("opacity", 0);
            $(".ans-letter svg").css("text-shadow", "2px 2px 2px rgba(0,0,0,1)");
            $(".ans-text svg").css("text-shadow", "2px 2px 2px rgba(0,0,0,1)");
            $(".ans-letter svg text").attr("fill", "#fff3ba");
            $(".ans-text svg text").attr("fill", "white");
          }
          else{
            $("#answer-" + answer + " .ans-main").css("opacity", 1);
            $("#answer-" + answer + " .ans-final").css("opacity", 0);
            $("#answer-" + answer + " .ans-correct").css("opacity", 0);
            $(".ans-letter svg").css("text-shadow", "2px 2px 2px rgba(0,0,0,1)");
            $(".ans-text svg").css("text-shadow", "2px 2px 2px rgba(0,0,0,1)");
            $("#answer-" + answer + " .ans-letter svg text").attr("fill", "#fff3ba");
            $("#answer-" + answer + " .ans-text svg text").attr("fill", "white");
          }
        }
      
        con.RevealAnswer = function(answer) {
          if (answer == "a") {
            $("#answer-" + answer + " .ans-letter").css("opacity", 1);
            $("#answer-" + answer + " .ans-text").css("opacity", 1);
            $("#answer-" + answer + " .ans-diagonal").css("opacity", 1);
            $(".question").playKeyframe({
              name: 'question-move-up-2',
              duration: "0.75s",
              timingFunction: 'ease'
            });
            setTimeout(function(){
              $("#answer-c").playKeyframe({
                name: 'answer-move-from-left',
                duration: "0.75s",
                timingFunction: 'ease'
              });
              setTimeout(function(){
                $("#answer-d").playKeyframe({
                  name: 'answer-move-from-right',
                  duration: "0.75s",
                  timingFunction: 'ease'
                });
              }, 100);
              setTimeout(function(){
                $("#answer-a").playKeyframe({
                  name: 'answer-move-from-left',
                  duration: "0.75s",
                  timingFunction: 'ease'
                });
              }, 200);
              setTimeout(function(){
                $("#answer-b").playKeyframe({
                  name: 'answer-move-from-right',
                  duration: "0.75s",
                  timingFunction: 'ease'
                });
              }, 300);
            }, 250);
          }
          else {
            $("#answer-" + answer + " .ans-letter").animate({"opacity":"1"}, 250, "linear");
            $("#answer-" + answer + " .ans-text").animate({"opacity":"1"}, 250, "linear");
            $("#answer-" + answer + " .ans-diagonal").animate({"opacity":"1"}, 250, "linear");
          }
        }
      
        con.FinalAnswer = function(answer) {
          $("#answer-" + answer + " .ans-main").css("opacity", 0);
          $("#answer-" + answer + " .ans-final").css("opacity", 1);
          $("#answer-" + answer + " .ans-correct").css("opacity", 0);
          $("#answer-" + answer + " .ans-letter svg").css("text-shadow", "none");
          $("#answer-" + answer + " .ans-text svg").css("text-shadow", "none");
          $("#answer-" + answer + " .ans-letter svg text").attr("fill", "#000000");
          $("#answer-" + answer + " .ans-text svg text").attr("fill", "#000000");
        }
      
        con.CorrectAnswer = function(answer) {
          $("#answer-" + answer + " .ans-main").css("opacity", 0);
          $("#answer-" + answer + " .ans-final").css("opacity", 0);
          $("#answer-" + answer + " .ans-correct").css("opacity", 1);
          $("#answer-" + answer + " .ans-letter svg").css("text-shadow", "none");
          $("#answer-" + answer + " .ans-text svg").css("text-shadow", "none");
          $("#answer-" + answer + " .ans-letter svg text").attr("fill", "#000000");
          $("#answer-" + answer + " .ans-text svg text").attr("fill", "#000000");
        }
      
        con.RevealNoPass = function(){
          $(".no-pass").animate({"opacity":"1"}, 250, "linear");
        }
      
        con.HideNoPass = function(){
          $(".no-pass").animate({"opacity":"0"}, 500, "linear");
        }
      
        con.MoveDownQAndA = function() {
          $(".question, .answer").playKeyframe({
            name: 'q-and-a-move-down',
            duration: "0.25s",
            timingFunction: 'linear'
          });
        }
      
        con.HideQAndA = function() {
          con.MoveDownQAndA();
          setTimeout(function(){
            con.ResetQuestion();
          }, 500);
        }
      
        con.FadeInQAndA = function(){
          $(".question, .answer").playKeyframe({
            name: 'q-and-a-fade-in',
            duration: "0.5s",
            timingFunction: 'linear'
          });
        }
      
        con.DisappearQAndA = function(){
          $(".question, .answer").playKeyframe('q-and-a-move-down');
        }
      
        con.ResetMoneyStrap = function(){
          $(".money, .total-money").css("opacity", 0).playKeyframe("reset");
          $(".money svg text, .total-money svg text").css("clip-path", "inset(0 50% 0 50%)").playKeyframe("reset");
          
          $(".money-2").css("opacity", 0).playKeyframe("reset");
          $(".old-top-money").css("clip-path", "inset(0 0 0 0%)").playKeyframe("reset");
          $(".top-money").css("clip-path", "inset(0 100% 0 0)").playKeyframe("reset");
        }
      
        con.RevealMoneyStrap = function(){
          $(".money").animate({"opacity":"1"}, 500, "linear", function(){
            $(".money svg text").playKeyframe({
              name: 'money-text-reveal',
              duration: "0.25s",
              timingFunction: 'linear'
            });
          });
        }
      
        con.HideMoneyStrap = function(){
          $(".money").playKeyframe({
            name: 'q-and-a-move-down',
            duration: "0.25s",
            timingFunction: 'linear'
          });
          setTimeout(function(){
            con.ResetMoneyStrap();
          }, 500);
        }
      
        con.RevealTotalMoneyStrap = function(){
          $(".total-money").animate({"opacity":"1"}, 500, "linear", function(){
            $(".total-money svg text").playKeyframe({
              name: 'money-text-reveal',
              duration: "0.25s",
              timingFunction: 'linear'
            });
          });
        }
      
        con.HideTotalMoneyStrap = function(){
          $(".total-money").playKeyframe({
            name: 'q-and-a-move-down',
            duration: "0.25s",
            timingFunction: 'linear'
          });
          setTimeout(function(){
            con.ResetMoneyStrap();
          }, 500);
        }
        
        con.RevealTopPrizeStrap = function(old_money, new_money){
          con.TextUpdateData(".old-top-money", accounting.formatMoney(old_money), 1);
          con.TextUpdateData(".top-money", accounting.formatMoney(new_money), 1);
          $(".money-2").css("opacity", 1).playKeyframe({
            name: 'answer-move-up',
            duration: "0.25s",
            timingFunction: 'linear'
          });
          setTimeout(function(){
            $(".old-top-money").playKeyframe({
              name: 'old-top-money-text-hide',
              duration: "0.25s",
              timingFunction: 'linear'
            });
            $(".top-money").playKeyframe({
              name: 'top-money-text-reveal',
              duration: "0.25s",
              timingFunction: 'linear'
            });
          }, 500);
        }
      
        con.HideTopPrizeStrap = function(){
          $(".money-2").playKeyframe({
            name: 'q-and-a-move-down',
            duration: "0.25s",
            timingFunction: 'linear'
          });
          setTimeout(function(){
            con.ResetMoneyStrap();
          }, 500);
        }
      
        con.ResetCommStrap = function(){
          $(".comm-strap").css("opacity", 0).playKeyframe("reset");
          $(".cs-money").css("clip-path", "inset(0 100% 0 0)").playKeyframe("reset");
        }
        
        con.RevealCommStrap = function(){
          $(".comm-strap").css("opacity", 1).playKeyframe({
            name: 'answer-move-up',
            duration: "0.25s",
            timingFunction: 'linear'
          });
          setTimeout(function(){
            $(".cs-money").playKeyframe({
              name: 'top-money-text-reveal',
              duration: "0.25s",
              timingFunction: 'linear'
            });
          }, 500);
        }
      
        con.HideCommStrap = function(){
          $(".comm-strap").playKeyframe({
            name: 'q-and-a-move-down',
            duration: "0.25s",
            timingFunction: 'linear'
          });
          setTimeout(function(){
            con.ResetCommStrap();
          }, 500);
        }
      
        con.ResetLifelineHolder = function(){
          $(".lifeline-holder").css("opacity", "0").playKeyframe("reset");
        }
      
        con.RevealLifelineHolder = function(){
          $(".lifeline-holder").playKeyframe({
            name: 'lifeline-holder-reveal',
            duration: "0.25s",
            timingFunction: 'linear'
          });
        }
      
        con.HideLifelineHolder = function(){
          $(".lifeline-holder").playKeyframe({
            name: 'lifeline-holder-hide',
            duration: "0.25s",
            timingFunction: 'linear'
          });
        }
      
        con.ResetContestantStrap = function(){
          $(".cont-strap").css("opacity", 0);
        }
      
        con.RevealContestantStrap = function(){
          $(".cont-strap").css("opacity", 1);
        }
      
        con.HideContestantStrap = function(){
          $(".cont-strap").css("opacity", 0);
        }
      
        con.ResetFFFAnswerOrder = function(){
          $(".fa-container").css("left","41.6%");
          $(".fa-answer").css("left","100%");
        }
      
        con.ShowFFFAnswerOrders = function(){
          $(".fa-container").animate({"left":"0%"}, 500, "linear");
        }
      
        con.ShowFFFAnswerOrder = function(number){
          $("#fa-answer-" + number).animate({"left":"56.5%"}, 250, "linear");
        }
        
        con.ResetFFFResults = function(){
          $(".fr-times").css("opacity",0);
          $(".fr-main").css("opacity",1);
          $(".fr-correct").css("opacity",0);
          $(".fr-container").css("opacity",0);
        }
      
        con.ShowFFFResultCorrect = function(no) {
          $("#fff-result-" + no + " .fr-correct").css("opacity", 1);
        }
      
        con.ShowFFFResultCorrectTimes = function(no) {
          $("#fff-result-" + no + " .fr-times").css("opacity", 1);
        }
        
        con.ResetFFFScoreboard = function(){
          $(".fs-score").css("opacity",0);
          $(".fs-name").css("opacity",0);
          $(".fs-times").css("opacity",0);
          $(".fs-main").css("opacity",0);
          $(".fs-winner").css("opacity",0);
        }
      
        con.ShowFFFWinner = function(no) {
          $("#fff-score-" + no + " .fs-winner").css("opacity", 1);
        }
        
        // Lifelines
      
        con.FiftyFiftyAction = function(answer1, answer2) {
          $("#ans-letter-" + answer1).css("opacity", 0);
          $("#ans-text-" + answer1).css("opacity", 0);
          $("#ans-letter-" + answer2).css("opacity", 0);
          $("#ans-text-" + answer2).css("opacity", 0);
        }
      
        //
      
        con.ScaleText = function(){
          con.SVGTextCustomize(".question");
          con.SVGTextCustomize(".ans-letter");
          con.SVGTextCustomize(".ans-text");
          con.SVGTextCustomize(".no-pass");
          con.SVGTextCustomize(".money");
          con.SVGTextCustomize(".top-text");
          con.SVGTextCustomize(".old-top-money");
          con.SVGTextCustomize(".top-money");
          con.SVGTextCustomize(".cont-name");
          con.SVGTextCustomize(".cont-hometown");
          con.SVGTextCustomize(".fa-q-text");
          con.SVGTextCustomize(".fa-ans-letter");
          con.SVGTextCustomize(".fa-ans-text");
          con.SVGTextCustomize(".fr-name");
          con.SVGTextCustomize(".fr-times");
          con.SVGTextCustomize(".fs-name");
          con.SVGTextCustomize(".fs-score");
          con.SVGTextCustomize(".fs-times");
        }
      
        con.ResetTimer();
        con.ResetQuestion();
        con.ResetMoneyStrap();
        con.ResetCommStrap();
        con.ResetLifelineHolder();
        con.ResetContestantStrap();
        con.ResetFFFAnswerOrder();
        con.ResetFFFResults();
        con.ResetFFFScoreboard();
      
        con.TextUpdateData("#ans-letter-a", "A:", 1);
        con.TextUpdateData("#ans-letter-b", "B:", 1);
        con.TextUpdateData("#ans-letter-c", "C:", 1);
        con.TextUpdateData("#ans-letter-d", "D:", 1);
      
        con.TextUpdateData(".no-pass", "Không thể chuyển", 1);
        con.TextUpdateData(".top-text", "MỐC TỐI ĐA MỚI", 1);
      
        //

        onValue(ref(db, dbKey), (snapshot) => {
            const data = snapshot.val();
            
            con.ScaleText();
          
            con.TextUpdateData(".cont-name", eval("data.cont_name_" + data.cont_to_introduce).toUpperCase(), 1);
            con.TextUpdateData(".cont-hometown", eval("data.cont_hometown_" + data.cont_to_introduce).toUpperCase(), 1);
          
            con.TextUpdateData(".question", data.question_line_1, 1);
            con.TextUpdateData(".question", data.question_line_2, 2);
            con.TextUpdateData("#ans-text-a", data.answer_a, 1);
            con.TextUpdateData("#ans-text-b", data.answer_b, 1);
            con.TextUpdateData("#ans-text-c", data.answer_c, 1);
            con.TextUpdateData("#ans-text-d", data.answer_d, 1);
          
            var len = data.question_line_1.length;
            if (len > 0 && data.question_line_1[len - 1] != " ") {
              con.TextUpdateData(".fa-q-text", data.question_line_1 + " " + data.question_line_2);
            }
            else {
              con.TextUpdateData(".fa-q-text", data.question_line_1 + data.question_line_2);
            }
            con.TextUpdateData("#fa-ans-letter-a", data.correct_order_1.toUpperCase() + ":", 1);
            con.TextUpdateData("#fa-ans-letter-b", data.correct_order_2.toUpperCase() + ":", 1);
            con.TextUpdateData("#fa-ans-letter-c", data.correct_order_3.toUpperCase() + ":", 1);
            con.TextUpdateData("#fa-ans-letter-d", data.correct_order_4.toUpperCase() + ":", 1);
            con.TextUpdateData("#fa-ans-text-a", eval("data.answer_" + data.correct_order_1), 1);
            con.TextUpdateData("#fa-ans-text-b", eval("data.answer_" + data.correct_order_2), 1);
            con.TextUpdateData("#fa-ans-text-c", eval("data.answer_" + data.correct_order_3), 1);
            con.TextUpdateData("#fa-ans-text-d", eval("data.answer_" + data.correct_order_4), 1);
          
            for (var i = 1; i <= 6; i++) {
              con.TextUpdateData("#fr-name-" + i, eval("data.cont_name_" + i), 1);
              con.TextUpdateData("#fr-times-" + i, eval("data.fff_times_" + i).toFixed(2), 1);
              con.TextUpdateData("#fs-name-" + i, eval("data.cont_name_" + i), 1);
              con.TextUpdateData("#fs-score-" + i, eval("data.fff_total_score_" + i), 1);
              con.TextUpdateData("#fs-times-" + i, eval("data.fff_total_times_" + i).toFixed(2), 1);
            }
          
            for (var i = 1; i <= 2; i++) {
              if(eval("data.lifeline_on_" + i) == false) {
                $("#lh-icon-" + i + " .ll-used").css("opacity", 1);
              }
              else{
                $("#lh-icon-" + i + " .ll-used").css("opacity", 0);
              }
            }
          
            if(data.show_introduce_contestants == 1) {
              con.RevealContestantStrap();
              upd("show_introduce_contestants", 0);
            }
          
            if(data.hide_introduce_contestants == 1) {
              con.HideContestantStrap();
              upd("hide_introduce_contestants", 0);
            }
          
            if(data.reveal_fff_question == 1) {
              con.RevealQuestion();
              upd("reveal_fff_question", 0);
            }
            if(data.reveal_fff_answers == 1) {
              con.RevealAllAnswers();
              upd("reveal_fff_answers", 0);
            }
            if(data.hide_fff_q_and_a == 1) {
              con.ResetQuestion();
              upd("hide_fff_q_and_a", 0);
            }
            if(data.reveal_fff_answer_orders == 1) {
              con.ShowFFFAnswerOrders();
              upd("reveal_fff_answer_orders", 0);
            }
            if(data.reveal_fff_order_1 == 1) {
              con.ShowFFFAnswerOrder(1);
              upd("reveal_fff_order_1", 0);
            }
            if(data.reveal_fff_order_2 == 1) {
              con.ShowFFFAnswerOrder(2);
              upd("reveal_fff_order_2", 0);
            }
            if(data.reveal_fff_order_3 == 1) {
              con.ShowFFFAnswerOrder(3);
              upd("reveal_fff_order_3", 0);
            }
            if(data.reveal_fff_order_4 == 1) {
              con.ShowFFFAnswerOrder(4);
              upd("reveal_fff_order_4", 0);
            }
            if(data.reveal_fff_results == 1) {
              $(".fr-container").css("opacity", 1);
              con.ResetFFFAnswerOrder();
              upd("reveal_fff_results", 0);
            }
            for (var i = 1; i <= 6; i++) {
              if(eval("data.fff_reveal_correct_" + i) == 1) {
                con.ShowFFFResultCorrect(i);
                upd("fff_reveal_correct_" + i, 0);
              }
              if(eval("data.fff_reveal_times_" + i) == 1) {
                con.ShowFFFResultCorrectTimes(i);
                upd("fff_reveal_times_" + i, 0);
              }
              if(eval("data.fff_reveal_winner_" + i) == 1) {
                con.ShowFFFWinner(i);
                upd("fff_reveal_winner_" + i, 0);
              }
            }
            if(data.hide_fff_results == 1) {
              con.ResetFFFResults();
              upd("hide_fff_results", 0);
            }          
            
            if(data.show_fff_scoreboard == 1) {
              $(".fs-main, .fs-name").css("opacity", 1);
              upd("show_fff_scoreboard", 0);
            }
            if(data.show_fff_scoreboard_score == 1) {
              $(".fs-score").css("opacity", 1);
              upd("show_fff_scoreboard_score", 0);
            }
            if(data.show_fff_scoreboard_times == 1) {
              $(".fs-times").css("opacity", 1);
              upd("show_fff_scoreboard_times", 0);
            }
            if(data.hide_fff_scoreboard == 1) {
              con.ResetFFFScoreboard();
              upd("hide_fff_scoreboard", 0);
            }
          
            if(data.show_ll_holder == 1) {
              con.RevealLifelineHolder();
              upd("show_ll_holder", 0);
            }
            if(data.hide_ll_holder == 1) {
              con.HideLifelineHolder();
              upd("hide_ll_holder", 0);
            }
          
            if(data.reveal_main_question == 1) {
              con.RevealQuestion();
              upd("reveal_main_question", 0);
            }
            if(data.reveal_main_answer_a == 1) {
              con.RevealAnswer("a");
              upd("reveal_main_answer_a", 0);
            }
            if(data.reveal_main_answer_b == 1) {
              con.RevealAnswer("b");
              upd("reveal_main_answer_b", 0);
            }
            if(data.reveal_main_answer_c == 1) {
              con.RevealAnswer("c");
              upd("reveal_main_answer_c", 0);
            }
            if(data.reveal_main_answer_d == 1) {
              con.RevealAnswer("d");
              upd("reveal_main_answer_d", 0);
            }
            if(data.play_timer == 1) {
              con.RevealAndPlayTimer(data.timer_secs);
              upd("play_timer", 0);
              upd("timer_secs", 0);
            }
            if(data.stop_timer == 1) {
              con.StopAndHideTimer();
              upd("stop_timer", 0);
            }
            if(data.reveal_no_pass == 1) {
              con.RevealNoPass();
              upd("reveal_no_pass", 0);
            }
            if(data.hide_no_pass == 1) {
              con.HideNoPass();
              upd("hide_no_pass", 0);
            }
            if(data.temp_hide_main_question == 1) {
              con.MoveDownQAndA();
              upd("temp_hide_main_question", 0);
            }
            if(data.temp_reveal_main_question == 1) {
              con.FadeInQAndA();
              upd("temp_reveal_main_question", 0);
            }
          
            if(data.hide_main_question == 1) {
              con.HideQAndA();
              upd("hide_main_question", 0);
            }
          
            if(data.reveal_final_ans_a == 1) {
              con.FinalAnswer("a");
              upd("reveal_final_ans_a", 0);
            }
            if(data.reveal_final_ans_b == 1) {
              con.FinalAnswer("b");
              upd("reveal_final_ans_b", 0);
            }
            if(data.reveal_final_ans_c == 1) {
              con.FinalAnswer("c");
              upd("reveal_final_ans_c", 0);
            }
            if(data.reveal_final_ans_d == 1) {
              con.FinalAnswer("d");
              upd("reveal_final_ans_d", 0);
            }
            if(data.reveal_correct_ans_a == 1) {
              con.CorrectAnswer("a");
              upd("reveal_correct_ans_a", 0);
            }
            if(data.reveal_correct_ans_b == 1) {
              con.CorrectAnswer("b");
              upd("reveal_correct_ans_b", 0);
            }
            if(data.reveal_correct_ans_c == 1) {
              con.CorrectAnswer("c");
              upd("reveal_correct_ans_c", 0);
            }
            if(data.reveal_correct_ans_d == 1) {
              con.CorrectAnswer("d");
              upd("reveal_correct_ans_d", 0);
            }
            if(data.final_ans_undo == 1) {
              con.ResetAnswerFC();
              upd("final_ans_undo", 0);
            }
          
            con.TextUpdateData(".money", accounting.formatMoney(data.question_winnings), 1);
            con.TextUpdateData(".total-money", accounting.formatMoney(data.total_winnings), 1);
          
            if(data.reveal_money_strap == 1) {
              con.RevealMoneyStrap();
              upd("reveal_money_strap", 0);
            }
            if(data.hide_money_strap == 1) {
              con.HideMoneyStrap();
              upd("hide_money_strap", 0);
            }
            if(data.reveal_total_money_strap == 1) {
              con.RevealTotalMoneyStrap();
              upd("reveal_total_money_strap", 0);
            }
            if(data.hide_total_money_strap == 1) {
              con.HideTotalMoneyStrap();
              upd("hide_total_money_strap", 0);
            }
          
            con.TextUpdateData(".cs-text", "CÒN " + (data.q_top - data.q_now + 1) + " CÂU HỎI ĐỂ TỚI MỐC");
            con.TextUpdateData(".cs-money", accounting.formatMoney(eval("data.mt_value_" + data.q_top)));
            if(data.reveal_comm_strap == 1) {
              con.RevealCommStrap();
              upd("reveal_comm_strap", 0);
            }            
            if(data.hide_comm_strap == 1) {
              con.HideCommStrap();
              upd("hide_comm_strap", 0);
            }
          
            if(data.reveal_top_money_strap_14 == 1) {
              con.RevealTopPrizeStrap(data.mt_value_15, data.mt_value_14);
              upd("reveal_top_money_strap_14", 0);
            }
            if(data.reveal_top_money_strap_13 == 1) {
              con.RevealTopPrizeStrap(data.mt_value_14, data.mt_value_13);
              upd("reveal_top_money_strap_13", 0);
            }
            if(data.reveal_top_money_strap_12 == 1) {
              con.RevealTopPrizeStrap(data.mt_value_13, data.mt_value_12);
              upd("reveal_top_money_strap_12", 0);
            }
            if(data.reveal_top_money_strap_11 == 1) {
              con.RevealTopPrizeStrap(data.mt_value_12, data.mt_value_11);
              upd("reveal_top_money_strap_11", 0);
            }
            if(data.reveal_top_money_strap_10 == 1) {
              con.RevealTopPrizeStrap(data.mt_value_11, data.mt_value_10);
              upd("reveal_top_money_strap_10", 0);
            }
            if(data.hide_top_money_strap == 1) {
              con.HideTopPrizeStrap();
              upd("hide_top_money_strap", 0);
            }
          
            // Lifelines
            if (data.ll_ff_activate == 1) {
              con.FiftyFiftyAction(data.ll_ff_ans_1, data.ll_ff_ans_2);
              upd("ll_ff_ans_1", "");
              upd("ll_ff_ans_2", "");
              upd("ll_ff_activate", 0);
            }
            // End of Lifelines
        });           

    }(window.CONTROLLER = window.CONTROLLER || {}));
});