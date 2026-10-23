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

        var num_of_qs = 15;
        var q_milestone = 5;

        //

        $.keyframe.define([
          {
            name: 'reset'
          },
          {
            name: 'ScaleOut',
            '0%': {
                "transform": "scale(1)",
                "margin-top": "-0.575%",
                "padding-top": "0.575%",
                "margin-bottom": "-0.575%",
                "padding-bottom": "0.575%",
                "opacity": 1
            },
            '100%': {
                "transform": "scale(0.943)",
                "margin-top": "0",
                "padding-top": "0",
                "margin-bottom": "0",
                "padding-bottom": "0",
                "opacity": 1
            }
          },
          {
            name: 'ScaleOpacityOut',
            '0%': {
                "transform": "scale(0.943)",
                "margin-top": "0",
                "padding-top": "0",
                "margin-bottom": "0",
                "padding-bottom": "0",
                "opacity": 1
            },
            '100%': {
                "transform": "scale(0.943)",
                "margin-top": "0",
                "padding-top": "0",
                "margin-bottom": "0",
                "padding-bottom": "0",
                "opacity": 0
            }
          },
          {
            name: 'ZoomInOutPassLozenge',
            '0%': {
                "transform": "scale(1)"
            },
            '50%': {
                "transform": "scale(1.2)"
            },
            '100%': {
                "transform": "scale(1)"
            }
          },
          {
            name: 'ScaleOutText',
            '0%': {
                "transform": "scale(1)"
            },
            '100%': {
                "transform": "scale(0.79)"
            }
          },
          {
            name: 'ScaleInLP',
            '0%': {
                "transform": "scale(0.943)",
                "margin-top": "0",
                "padding-top": "0",
                "margin-bottom": "0",
                "padding-bottom": "0"
            },
            '100%': {
                "transform": "scale(1)",
                "margin-top": "-0.575%",
                "padding-top": "0.575%",
                "margin-bottom": "-0.575%",
                "padding-bottom": "0.575%"
            }
          },
          {
            name: 'ScaleInLPText2',
            '0%': {
                "transform": "scale(0.79)",
                "opacity": "0.5"
            },
            '100%': {
                "transform": "scale(1)",
                "opacity": "1"
            }
          },
          {
            name: 'ScaleInLPText',
            '0%': {
                "transform": "scale(0.79)"
            },
            '100%': {
                "transform": "scale(1)"
            }
          },
          {
            name: 'ScaleOutLP',
            '0%': {
                "transform": "scale(1)",
                "margin-top": "-0.575%",
                "padding-top": "0.575%",
                "margin-bottom": "-0.575%",
                "padding-bottom": "0.575%",
                "opacity": 1
            },
            '100%': {
                "transform": "scale(0.943)",
                "margin-top": "0",
                "padding-top": "0",
                "margin-bottom": "0",
                "padding-bottom": "0",
                "opacity": 0
            }
          },
          {
            name: 'ScaleOutLPText',
            '0%': {
                "transform": "scale(1)",
                "opacity": 1
            },
            '100%': {
                "transform": "scale(0.79)",
                "opacity": 0.5
            }
          }
        ]);
      
        con.ResetMoneytree = function(){
          $(".moneytree").html("");
        }
      
        con.RenderMoneytree = function(num_of_qs, now, top, milestone) {
          var htmlMTString = "";
          var txt = "";
          txt += '<div class="moneyTd-prize">';
          txt += '<svg data-top="0" data-ypos="0" data-lines="1" data-scale="true">';
          txt += '<text lengthAdjust="spacingAndGlyphs" id="line_1" y="50%" dominant-baseline="central"></text>';
          txt += '</svg>';
          txt += '</div>';

          var txt_inner = "";
          txt_inner += '<div class="moneyTd-inner-prize">';
          txt_inner += '<svg data-top="0" data-ypos="0" data-lines="1" data-scale="true">';
          txt_inner += '<text lengthAdjust="spacingAndGlyphs" id="line_1" y="50%" dominant-baseline="central"></text>';
          txt_inner += '</svg>';
          txt_inner += '</div>';
          
          for (var i = num_of_qs; i >= 1; i--) {
            htmlMTString += '<div class="moneyTr" id="moneyTr-' + i + '">';
            
            if (i < now) {
              if (milestone.includes(i)) {
                htmlMTString += '<div class="moneyTd" id="moneyTd-cm">';
                htmlMTString += txt;
              }
              else {
                htmlMTString += '<div class="moneyTd" id="moneyTd-cn">';
                htmlMTString += txt;
              }
            }
            else if (i > top) {
              htmlMTString += '<div class="moneyTd" id="moneyTd-en">';
                htmlMTString += txt;
            }
            else if (i == top) {
              if (i == now) {
                htmlMTString += '<div class="moneyTd" id="moneyTd-nlp">';
                htmlMTString += txt;
                htmlMTString += '<div id="moneyTd-nlp-inner">';
                htmlMTString += '<div class="lozenge-line-bright"></div>';
                htmlMTString += txt_inner;
                htmlMTString += '</div>';
              }
              else{
                htmlMTString += '<div class="moneyTd" id="moneyTd-lp">';
                htmlMTString += txt;
                htmlMTString += '<div id="moneyTd-lp-inner">';
                htmlMTString += txt_inner;
                htmlMTString += '</div>';
              }
            }
            else if (now < i && i < top) {
              if (milestone.includes(i)) {
                htmlMTString += '<div class="moneyTd" id="moneyTd-m">';
                htmlMTString += txt;
              }
              else {
                htmlMTString += '<div class="moneyTd" id="moneyTd-n">';
                htmlMTString += txt;
              }
            }
            else if(i == now) {
              if (milestone.includes(i)) {
                htmlMTString += '<div class="moneyTd" id="moneyTd-nm">';
                htmlMTString += txt;
                htmlMTString += '<div id="moneyTd-nm-inner">';
                htmlMTString += txt_inner;
                htmlMTString += '</div>';
              }
              else {
                htmlMTString += '<div class="moneyTd" id="moneyTd-nn">';
                htmlMTString += txt;
                htmlMTString += '<div id="moneyTd-nn-inner">';
                htmlMTString += txt_inner;
                htmlMTString += '</div>';
              }
            }
            
            htmlMTString += '</div>';
            htmlMTString += '</div>';
          }
          
          $(".moneytree").html(htmlMTString);
        }
      
        con.RenderMoneytreeForExplaining = function(num_of_qs, top, milestone) {
          var htmlMTString = "";
          var txt = "";
          txt += '<div class="moneyTd-prize">';
          txt += '<svg data-top="0" data-ypos="0" data-lines="1" data-scale="true">';
          txt += '<text lengthAdjust="spacingAndGlyphs" id="line_1" y="50%" dominant-baseline="central"></text>';
          txt += '</svg>';
          txt += '</div>';

          var txt_inner = "";
          txt_inner += '<div class="moneyTd-inner-prize">';
          txt_inner += '<svg data-top="0" data-ypos="0" data-lines="1" data-scale="true">';
          txt_inner += '<text lengthAdjust="spacingAndGlyphs" id="line_1" y="50%" dominant-baseline="central"></text>';
          txt_inner += '</svg>';
          txt_inner += '</div>';
          
          for (var i = num_of_qs; i >= 1; i--) {
            htmlMTString += '<div class="moneyTr" id="moneyTr-' + i + '">';
            
            if (i == top) {
              htmlMTString += '<div class="moneyTd" id="moneyTd-lp">';
              htmlMTString += txt;
              htmlMTString += '<div id="moneyTd-lp-inner">';
              htmlMTString += '<img id="moneyTd-inner-eliminated" src="Assets/Moneytree_Lozenge/normal_question.png" style="width: 100%; height: 100%; top: 0%; right: 0%; opacity: 0.5;" />';
              htmlMTString += '<img id="moneyTd-inner-lp" src="Assets/Moneytree_Lozenge/last_question.png" style="width: 100%; height: 100%; top: 0%; right: 0%; opacity: 1;" />';
              htmlMTString += txt_inner;
              htmlMTString += '</div>';
            }
            else if (i < top) {
              if (milestone.includes(i)) {
                htmlMTString += '<div class="moneyTd" id="moneyTd-m">';
                htmlMTString += txt;
                htmlMTString += '<div id="moneyTd-nm-inner">';
                htmlMTString += '<img id="moneyTd-inner-milestone" src="Assets/Moneytree_Lozenge/milestone_question.png" style="width: 100%; height: 100%; top: 0%; right: 0%; opacity: 1;" />';
                htmlMTString += '<img id="moneyTd-inner-correct" src="Assets/Moneytree_Lozenge/correct_question.png" style="width: 100%; height: 100%; top: 0%; right: 0%;" />';
                htmlMTString += '<img id="moneyTd-inner-correct-milestone" src="Assets/Moneytree_Lozenge/correct_milestone_question.png" style="width: 100%; height: 100%; top: 0%; right: 0%;" />';
                htmlMTString += txt_inner;
                htmlMTString += '</div>';
                if (i == top - 1) {
                  htmlMTString += '<div id="moneyTd-lp-inner">';
                  htmlMTString += '<img id="moneyTd-inner-normal" src="Assets/Moneytree_Lozenge/normal_question.png" style="width: 100%; height: 100%; top: 0%; right: 0%; opacity: 1;" />';
                  htmlMTString += '<img id="moneyTd-inner-lp" src="Assets/Moneytree_Lozenge/last_question.png" style="width: 100%; height: 100%; top: 0%; right: 0%; opacity: 0;" />';
                  htmlMTString += txt_inner;
                  htmlMTString += '</div>';
                }
              }
              else {
                htmlMTString += '<div class="moneyTd" id="moneyTd-n">';
                htmlMTString += txt;
                htmlMTString += '<div id="moneyTd-nn-inner">';
                htmlMTString += '<img id="moneyTd-inner-correct" src="Assets/Moneytree_Lozenge/correct_question.png" style="width: 100%; height: 100%; top: 0%; right: 0%;" />';
                htmlMTString += txt_inner;
                htmlMTString += '</div>';
                if (i == top - 1) {
                  htmlMTString += '<div id="moneyTd-lp-inner">';
                  htmlMTString += '<img id="moneyTd-inner-normal" src="Assets/Moneytree_Lozenge/normal_question.png" style="width: 100%; height: 100%; top: 0%; right: 0%; opacity: 1;" />';
                  htmlMTString += '<img id="moneyTd-inner-lp" src="Assets/Moneytree_Lozenge/last_question.png" style="width: 100%; height: 100%; top: 0%; right: 0%; opacity: 0;" />';
                  htmlMTString += txt_inner;
                  htmlMTString += '</div>';
                }
              }
            }
            
            htmlMTString += '</div>';
            htmlMTString += '</div>';
          }
          
          $(".moneytree").html(htmlMTString);
        }
      
        /*
        con.RenderMoneytree = function(num_of_qs, now, top, milestone) {
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
              if (milestone.includes(i)) {
                htmlMTString += '<div class="moneyTd" id="moneyTd-tm">';
              }
              else {
                htmlMTString += '<div class="moneyTd" id="moneyTd-t">';
              }
            }
            else if(i == now) {
              if (milestone.includes(i)) {
                htmlMTString += '<div class="moneyTd" id="moneyTd-ntm">';
              }
              else {
                htmlMTString += '<div class="moneyTd" id="moneyTd-nt">';
              }
            }
            
            htmlMTString += txt;
            htmlMTString += '</div>';
            htmlMTString += '</div>';
          }
          
          $(".moneytree").html(htmlMTString);
        }
        */

        // Moneytree Illustration for Explaining the Rules
        // Note: This is only illustration, does not affect the data of the actual game
        con.RulesIllustration = function(step = 0) {
          if (step == 0) {
            $(".mt-cont-name").css({"top": "11%", "left": "100%"});
            $(".mt-q-left").css("left", "100%");
            $(".ll-pass-lozenge").css("left", "100%");
            con.RenderMoneytreeForExplaining(num_of_qs, num_of_qs, [q_milestone]);
            $(".moneyTr").css("left", "100%");
            $("#moneyTd-nn-inner, #moneyTd-nm-inner").css("opacity", 0);
            $("#moneyTd-inner-correct, #moneyTd-inner-correct-milestone, #moneyTd-inner-eliminated, #moneyTd-inner-normal, #moneyTd-inner-milestone").css("opacity", 0);
            $("#moneyTd-inner-lp").css("opacity", 1);
            
            $("#moneyTr-" + (num_of_qs - 1) + " #moneyTd-lp-inner").css("opacity", 0);
          }
          else if (step == 1) {
            for (var i = 1; i <= num_of_qs; i++) {
              setTimeout(function(i) {
                $("#moneyTr-" + i).animate({"left": "0%"}, 500);
              }, 75 * (i - 1), i);
            }
            setTimeout(function() {
              $(".mt-q-left").animate({"left": "68.5%"}, 250);
            }, 75 * num_of_qs + 250);
            setTimeout(function() {
              $(".mt-cont-name").animate({"left": "68.5%"}, 250);
            }, 75 * (num_of_qs + 1) + 250);

            upd("sfx_po10_reveal", 1);
          }
          else if (step == 2) {
            for (var i = 1; i <= num_of_qs; i++) {
              setTimeout(function(i) {
                var obj = "#moneyTr-" + i + " #moneyTd-nm-inner";
                if ($("#moneyTr-" + i + " #moneyTd-nm-inner").length == 0) {
                  obj = "#moneyTr-" + i + " #moneyTd-nn-inner";
                }
                var obj_cr = "#moneyTr-" + i + " #moneyTd-inner-correct";

                if ($(obj).length) {
                  $(obj).css("opacity", 1);
                  setTimeout(function() {
                    $(obj).animate({"opacity": "0"}, 1000);
                    $(obj_cr).animate({"opacity": "1"}, 1000);
                    $(obj).playKeyframe({
                      name: 'ScaleOut',
                      duration: '1000ms'
                    });
                    $(obj + " svg text").playKeyframe({
                      name: 'ScaleOutText',
                      duration: '1000ms'
                    });
                  }, 375);
                }

                if (i == 1) {
                  upd("sfx_mt_1", 1);
                }
                if (i == 8) {
                  upd("sfx_mt_2", 1);
                }
              }, 150 * (i - 1), i);
            }

            setTimeout(function() {
              $("#moneyTd-nm-inner, #moneyTd-nn-inner").playKeyframe({
                name: 'ScaleOpacityOut',
                duration: '500ms',
                complete: function() {
                   $("#moneyTd-nm-inner, #moneyTd-nn-inner, #moneyTd-nm-inner svg text, #moneyTd-nn-inner svg text").resetKeyframe();
                }               
              });

              upd("sfx_mt_3", 1);
            }, 150 * num_of_qs + 1500);
          }
          else if (step == 3) {
            $("#moneyTr-" + (num_of_qs) + " #moneyTd-lp").css("background-image", "none");
            $("#moneyTr-" + (num_of_qs) + " .moneyTd-prize").css("opacity", "0");
            $("#moneyTr-" + (num_of_qs) + " #moneyTd-lp-inner").css("background-image", "none");
            
            $("#moneyTr-" + (num_of_qs) + " #moneyTd-inner-lp").animate({"opacity": "0"}, 1000);
            $("#moneyTr-" + (num_of_qs) + " #moneyTd-inner-eliminated").animate({"opacity": "0.5"}, 1000);

            $("#moneyTr-" + (num_of_qs) + " #moneyTd-lp-inner").playKeyframe({
              name: 'ScaleOut',
              duration: '1000ms'
            });

            $("#moneyTr-" + (num_of_qs) + " #moneyTd-lp-inner svg text").playKeyframe({
              name: 'ScaleOutLPText',
              duration: '1000ms'
            });

            $("#moneyTr-" + (num_of_qs - 1) + " #moneyTd-lp-inner").css("opacity", 1);
            $("#moneyTr-" + (num_of_qs - 1) + " #moneyTd-inner-lp").css("opacity", 0);
            $("#moneyTr-" + (num_of_qs - 1) + " #moneyTd-inner-normal").css("opacity", 1);

            $("#moneyTr-" + (num_of_qs - 1) + " #moneyTd-inner-lp").animate({"opacity": "1"}, 1000);

            $("#moneyTr-" + (num_of_qs - 1) + " #moneyTd-lp-inner").playKeyframe({
              name: 'ScaleInLP',
              duration: '1000ms'
            });

            $("#moneyTr-" + (num_of_qs - 1) + " #moneyTd-lp-inner svg text").playKeyframe({
              name: 'ScaleInLPText',
              duration: '1000ms'
            });
              
            upd("sfx_mt_4", 1);

            setTimeout(function() {
              $("#moneyTr-" + (num_of_qs - 1) + " #moneyTd-inner-lp").animate({"opacity": "0"}, 1000);

              $("#moneyTr-" + (num_of_qs - 1) + " #moneyTd-lp-inner").playKeyframe({
                name: 'ScaleOut',
                duration: '1000ms',
                complete: function() {
                  $(this).resetKeyframe();
                  $("#moneyTr-" + (num_of_qs - 1) + " #moneyTd-lp-inner").css("opacity", 0);
                  $("#moneyTr-" + (num_of_qs - 1) + " #moneyTd-inner-lp").css("opacity", 0);
                  $("#moneyTr-" + (num_of_qs - 1) + " #moneyTd-inner-normal").css("opacity", 1);
                }
              });

              $("#moneyTr-" + (num_of_qs - 1) + " #moneyTd-lp-inner svg text").playKeyframe({
                name: 'ScaleOutText',
                duration: '1000ms',
                complete: function() {
                  $(this).resetKeyframe();
                }
              });
            
              //
            
              $("#moneyTr-" + (num_of_qs) + " #moneyTd-inner-lp").animate({"opacity": "1"}, 1000);
              $("#moneyTr-" + (num_of_qs) + " #moneyTd-inner-eliminated").animate({"opacity": "0"}, 1000);

              $("#moneyTr-" + (num_of_qs) + " #moneyTd-lp-inner").playKeyframe({
                name: 'ScaleInLP',
                duration: '1000ms',
                complete: function() {
                  $(this).resetKeyframe();
                  $("#moneyTr-" + (num_of_qs) + " #moneyTd-lp").css("background-image", "url('../Assets/Moneytree_Lozenge/normal_question.png')");
                  $("#moneyTr-" + (num_of_qs) + " .moneyTd-prize").css("opacity", "1");
                  $("#moneyTr-" + (num_of_qs) + " #moneyTd-lp-inner").css("background-image", "url('../Assets/Moneytree_Lozenge/normal_question.png')");
                }
              });

              $("#moneyTr-" + (num_of_qs) + " #moneyTd-lp-inner svg text").playKeyframe({
                name: 'ScaleInLPText2',
                duration: '1000ms',
                complete: function() {
                  $(this).resetKeyframe();
                }
              });
              
              upd("sfx_mt_5", 1);
            }, 2000);
          }
          else if (step == 4) {
            $("#moneyTr-" + 5 + " #moneyTd-nm-inner").playKeyframe({
              name: 'ScaleInLP',
              duration: '1000ms'
            });

            $("#moneyTr-" + 5 + " #moneyTd-nm-inner").css("z-index", 5);
            $("#moneyTr-" + 5 + " #moneyTd-nm-inner").css("opacity", 1);
            $("#moneyTr-" + 5 + " #moneyTd-inner-milestone").css("opacity", 0);
            $("#moneyTr-" + 5 + " #moneyTd-inner-correct").css("opacity", 0);
            $("#moneyTr-" + 5 + " #moneyTd-inner-correct-milestone").transition({"opacity" : "1"}, 1000, 'linear');

            $("#moneyTr-" + 5 + " #moneyTd-nm-inner svg text").playKeyframe({
              name: 'ScaleInLPText',
              duration: '1000ms'
            });
              
            upd("sfx_mt_6", 1);
          }
          else if (step == 5) {
              $(".mt-cont-name").animate({"top": "6%"}, 500);
              $(".ll-pass-lozenge").animate({"left": "67%"}, 500);
              upd("sfx_ll_pass_appear", 1);

              setTimeout(function() {
                upd("sfx_ll_pass_ping", 1);

                $(".ll-pass-lozenge").playKeyframe({
                  name: 'ZoomInOutPassLozenge',
                  duration: '1000ms',
                  complete: function() {
                    $(this).resetKeyframe();
                  }
                });
              }, 1000);
          }
          else {
            $(".mt-cont-name").css({"top": "6%", "left": "68.5%"});
            $(".mt-q-left").css("left", "68.5%");
            $(".ll-pass-lozenge").css("left", "67%");
            $(".moneyTr").css("left", "0%");
            $("#moneyTd-nn-inner, #moneyTd-nm-inner").css("opacity", 1);
            $("#moneyTd-inner-correct, #moneyTd-inner-correct-milestone, #moneyTd-inner-eliminated, #moneyTd-inner-normal, #moneyTd-inner-milestone").css("opacity", 0);
            $("#moneyTd-inner-lp").css("opacity", 0);
            
            $("#moneyTr-" + (num_of_qs - 1) + " #moneyTd-lp-inner").css("opacity", 0);
          }
        }
      
        //
      
        con.ScaleText = function(){
          $(".moneyTr").each(function(){
            con.SVGTextCustomize("#" + this.id + " .moneyTd .moneyTd-prize");
            con.SVGTextCustomize("#" + this.id + " .moneyTd .moneyTd-inner-prize"); 
          });
          con.SVGTextCustomize(".mt-cont-name");
          con.SVGTextCustomize(".mt-q-left");
          con.SVGTextCustomize(".mt-c-left");
        }
      
        con.ResetMoneytree();

        con.RulesIllustration();
        /*
        setTimeout(function(){
          con.RulesIllustration(1);
        }, 1000);
        setTimeout(function(){
          con.RulesIllustration(2);
        }, 3000);
        setTimeout(function(){
          con.RulesIllustration(3);
        }, 9000);
        setTimeout(function(){
          con.RulesIllustration(4);
        }, 14000);
        setTimeout(function(){
          con.RulesIllustration(5);
          upd("explaining_the_moneytree_mode", 0);
        }, 18000);
        */

        onValue(ref(db, dbKey), (snapshot) => {
          const data = snapshot.val();

          if(data.reload == 1) {
            location.reload();
            upd("reload", 0);
          }     

          if(data.reload_main_mt == 1) {
            location.reload();
            upd("reload_main_mt", 0);
          }     

          if (data.explaining_the_moneytree_mode != 1) {
            $(".mt-cont-name").css({"top": "6%", "left": "68.5%"});
            $(".mt-q-left").css("left", "68.5%");
            $(".ll-pass-lozenge").css("left", "67%");
            $(".moneyTr").css("left", "0%");

            num_of_qs = data.num_of_qs;
            q_milestone = data.q_milestone;

            con.RenderMoneytree(data.num_of_qs, data.q_now_follower, data.q_top_follower, [data.q_milestone]);
          }

          if (data.mt_explain_step_0 == 1) {
            con.RulesIllustration(0);
            upd("mt_explain_step_0", 0);
          }
          if (data.mt_explain_step_1 == 1) {
            con.RulesIllustration(1);
            upd("mt_explain_step_1", 0);
          }
          if (data.mt_explain_step_2 == 1) {
            con.RulesIllustration(2);
            upd("mt_explain_step_2", 0);
          }
          if (data.mt_explain_step_3 == 1) {
            con.RulesIllustration(3);
            upd("mt_explain_step_3", 0);
          }
          if (data.mt_explain_step_4 == 1) {
            con.RulesIllustration(4);
            upd("mt_explain_step_4", 0);
          }
          if (data.mt_explain_step_5 == 1) {
            con.RulesIllustration(5);
            upd("mt_explain_step_5", 0);
          }

          for (var i = 1; i <= data.num_of_qs; i++) {
            var value = 0;
            if(eval("data.mt_value_" + i) != undefined){
              value = eval("data.mt_value_" + i);
            }
            if (value != null && $("#moneyTr-" + i + " .moneyTd").length) {
              con.TextUpdateData("#moneyTr-" + i + " .moneyTd .moneyTd-prize", accounting.formatMoney(value), 1);
              con.TextUpdateData("#moneyTr-" + i + " .moneyTd .moneyTd-inner-prize", accounting.formatMoney(value), 1);
            }
          }

          con.TextUpdateData(".mt-cont-name", eval("data.cont_name_" + data.cont_now).toUpperCase(), 1);
          con.TextUpdateData(".mt-q-left", "CÒN LẠI " + (data.q_top - data.q_now + 1) + " CÂU HỎI", 1);
          con.TextUpdateData(".mt-c-left", data.c_left + " NGƯỜI CHƠI", 1);

          if (data.is_a_round_played == true) {
            con.TextUpdateData(".ll-pass-lozenge", "KHÔNG CÒN CHUYỂN", 1);
          }
          else {
            if(data.lifeline_on_pass == false) {
              con.TextUpdateData(".ll-pass-lozenge", "KHÔNG THỂ CHUYỂN", 1);
            }
            else {
              con.TextUpdateData(".ll-pass-lozenge", "CÓ THỂ CHUYỂN", 1);
            }
          }

          /*
          if(data.lifeline_on_pass == false) {
            $("#ll-pass .ll-used").css("opacity", 1);
          }
          else {
            $("#ll-pass .ll-used").css("opacity", 0);
          }
          */

          con.ScaleText();
        });           

    }(window.CONTROLLER = window.CONTROLLER || {}));
});