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

        var atom_spinning_condition = false;
        var glow_spinning_condition = false;
        var tp_atom_brightness_condition = false;
      
        //

        $.keyframe.define([
          {
            name: 'reset'
          }
        ]);

        con.ResetVideos = function() {
          $("#bg-hold div").css("opacity", 0);
        }

        con.PlayVideo = function(video_id) {
          con.ResetVideos();
          $("#bg-hold " + video_id).css("opacity", 1);
        }

        /*
        con.RotateInRedLogo = function() {
          var total = 25;

          for (var i = 1; i <= total; i++) {
              $(".logo-block-red").prepend('<span></span>');
          }

          $('.logo-block-red span').each(function(i) {
              $(this).transition(
                  {
                      "transform": "rotateY(-90deg) translateZ(" + (i * 1.25) + "px)"
                  },
                  500,
                  'linear'
              );

              setTimeout(function() {
                $('.logo-block-red span').remove();
              }, 500 + 250);
          });
        }
        */

        con.InitRedLogo = function() {
          var total = 20;

          for (var i = 1; i <= total; i++) {
              $(".logo-block-red").prepend('<span></span>');
          }
        }
       
        con.RotateInRedLogo = function() {
          var total = 20;

          // for (var i = 1; i <= total; i++) {
          //     $(".logo-block-red").prepend('<span></span>');
          // }

          var j = -(total + 1) / 2;

          $('.logo-block-red span').each(function(i) {
              $(this).transition({"transform": "rotateY(-90deg) translateZ(" + (j * 1.5) + "px)"}, 500, 'ease-in', function() {
                if ($(this).attr("id") != "main") {
                  // $(this).remove();
                }
                else {
                  $(this).css({"transform": "rotateY(0deg) translateZ(0px)"});
                  //$(".logo-block-red").css("opacity", "0");
                }
              });
              j++;
          });
        }
       
        con.RotateOutRedLogo = function() {
          var total = 20;

          // for (var i = 1; i <= total; i++) {
          //     $(".logo-block-red").prepend('<span></span>');
          // }

          var j = -(total + 1) / 2;

          $('.logo-block-red span').each(function(i) {
            console.log(i);
              $(this).css({"transform": "rotateY(90deg) translateZ(" + (j * 1.5) + "px)"});
              j++;
          });

          j = -(total + 1) / 2;

          $('.logo-block-red span').each(function(i) {
              $(this).transition({"transform": "rotateY(0deg) translateZ(0px)"}, 500, 'ease-out', function() {
                // if ($(this).attr("id") != "main") {
                //   $(this).remove();
                // }
              });
              j++;
          });
        }

        con.HideAllLogos = function() {
          $(".logo-block-red").css("opacity", "0");
          $(".logo-block-blue").css("opacity", "0");
        }

        con.ZoomOutAllLogos = function() {
          $(".logo-block-red").transition({"transform" : "scale(0)"}, 250, 'ease-in');
          $(".logo-block-blue").transition({"transform" : "scale(0)"}, 250, 'ease-in');
        }

        con.SetupLogoMain = function() {
            var obj = ".logo-block-red";

            $(obj + " .logo-red-text-lozenge").css("transform", "scale(1)");
            $(obj + " .logo-red-text-center").css("transform", "scale(1)");
            $(obj + " .logo-red-text-above").css("opacity", "1");
            $(obj + " .logo-red-text-below").css("opacity", "1");
        }

        con.SetupLogoRedEmpty = function() {
            var obj = ".logo-block-red";

            $(obj + " .logo-red-text-lozenge").css("transform", "scale(0)");
            $(obj + " .logo-red-text-center").css("transform", "scale(0)");
            $(obj + " .logo-red-text-above").css("opacity", "0");
            $(obj + " .logo-red-text-below").css("opacity", "0");
        }

        con.ZoomInLogoRed = function() {
          $(".logo-block-red").css({"opacity" : "1", "transform" : "scale(0)"});
          $(".logo-block-red").transition({"transform" : "scale(1)"}, 250, 'ease-out');
          $(".logo-block-blue").css({"opacity" : "0", "transform" : "scale(1)"});
        }

        con.ZoomInLogoBlue = function() {
          $(".logo-block-blue").css({"opacity" : "1", "transform" : "scale(0)"});
          $(".logo-block-blue").transition({"transform" : "scale(1)"}, 250, 'ease-out');
          $(".logo-block-red").css({"opacity" : "0", "transform" : "scale(1)"});
        }

        function spin() {
          if (!atom_spinning_condition) return;
          $(".logo-block-red .logo-red-atom").transition({"transform" : "rotateZ(10deg)"}, 1000, 'linear', function() {
            $(".logo-block-red .logo-red-atom").css("transform", "rotateZ(0deg)");
            spin();
          });
        }

        con.IntroCont = function() {
          $("#bg-hold div").transition({"opacity" : "0"}, 1000, 'linear');
          $(".bg2").stop().transition({"opacity" : "1"}, 1000, 'linear');

          atom_spinning_condition = true;
          spin();
        }

        con.StopIntroCont = function() {
          $("#bg-hold div").transition({"opacity" : "0"}, 1000, 'linear');
          $(".bg-intro").stop().transition({"opacity" : "1"}, 1000, 'linear');

          atom_spinning_condition = false;
        }

        con.HostEntranceLogoRed = function() {
          var obj = ".logo-block-red";
          $(obj + " .logo-red-text-lozenge, " + obj + " .logo-red-text-center").css("opacity", 0);
          $(obj).css({"opacity" : "1", "transform" : "scale(0)"});
          $(obj).transition({"transform" : "scale(1)"}, 500, 'ease-out');
          setTimeout(function() {
            $(obj + " .logo-red-text-lozenge").css({"opacity" : "1", "transform" : "translateY(100%) scale(10)"});
            $(obj + " .logo-red-text-lozenge").transition({"transform" : "translateY(0) scale(1)"}, 250, 'ease-out');

            $(obj + " .logo-red-text-center").css({"opacity" : "1", "transform" : "translateY(100%) scale(10)"});
            $(obj + " .logo-red-text-center").transition({"transform" : "translateY(0) scale(1)"}, 250, 'ease-out');
          }, 1000);
          $(obj + " .logo-red-ques-mark").transition({"transform" : "rotateZ(720deg)"}, 4500, 'ease', function() {
            $(obj + " .logo-red-ques-mark").css("transform", "rotateZ(0deg)");
            $(obj + " .logo-red-text-lozenge").transition({"transform" : "scale(1.5)"}, 250, function() {
              $(obj + " .logo-red-text-lozenge").transition({"transform" : "scale(1)"}, 250);
            });
            $(obj + " .logo-red-text-center").transition({"transform" : "scale(1.5)"}, 250, function() {
              $(obj + " .logo-red-text-center").transition({"transform" : "scale(1)"}, 250);
            });
          });
        }

        con.FFFStart = function() {
          // con.RotateInRedLogo();
          // setTimeout(function() {
          //   $(".logo-block-red").css("opacity", "1");
          //   con.RotateOutRedLogo();
          // }, 500);

          var obj = ".logo-block-red";
          $(obj + " .logo-red-text-lozenge").transition({"transform" : "scale(0)"}, 250, 'ease-in');
          $(obj + " .logo-red-text-center").transition({"transform" : "scale(0)"}, 250, 'ease-in');
          $(obj + " .logo-red-text-above").transition({"opacity" : "0"}, 250, 'linear');
          $(obj + " .logo-red-text-below").transition({"opacity" : "0"}, 250, 'linear');

          $("#bg-hold div").transition({"opacity" : "0"}, 1000, 'linear');
          $(".bg-dark-red").stop().transition({"opacity" : "1"}, 1000, 'linear');

          setTimeout(function() {
            $(obj + " .logo-fff-text").transition({"transform" : "scale(1.5)"}, 250, 'ease-out', function() {
              $(obj + " .logo-fff-text").transition({"transform" : "scale(1)"}, 250, 'ease-in');
            });
          }, 500);
        }

        con.FFFReadyToAnswer = function() {
          var obj = ".logo-block-red";
          $(obj + " .logo-red-ques-mark").transition({"transform" : "rotateZ(720deg)"}, 1500, 'ease', function() {
            $(obj + " .logo-red-ques-mark").css("transform", "rotateZ(0deg)");
          });
        }

        con.FFFStartAnswer = function() {
          var obj = ".logo-block-red";
          $(obj + " .logo-fff-text").transition({"transform" : "scale(1.5)"}, 250, 'ease-out', function() {
            $(obj + " .logo-fff-text").transition({"transform" : "scale(1)"}, 250, 'ease-in');
          });

          atom_spinning_condition = true;
          spin();
        }

        con.FFFStopAnswer = function() {
          var obj = ".logo-block-red";
          $(obj + " .logo-fff-text").transition({"transform" : "scale(1.5)"}, 250, 'ease-out', function() {
            $(obj + " .logo-fff-text").transition({"transform" : "scale(1)"}, 250, 'ease-in');
          });

          atom_spinning_condition = false;
        }

        con.FFFStop = function() {
          // con.RotateInRedLogo();
          // setTimeout(function() {
          //   $(".logo-block-red").css("opacity", "1");
          //   con.RotateOutRedLogo();
          // }, 500);

          var obj = ".logo-block-red";
          $(obj + " .logo-fff-text").transition({"transform" : "scale(0)"}, 250, 'ease-out');
        }

        con.FadeFromRedToBlue = function() {
          $("#bg-hold div").transition({"opacity" : "0"}, 1000, 'linear');
          $(".bg-ques").stop().transition({"opacity" : "1"}, 1000, 'linear');

          $(".logo-block-red").transition({"opacity" : "0"}, 1000, 'linear');
          $(".logo-block-blue").transition({"opacity" : "1"}, 1000, 'linear');
        }

        con.FadeFromBlueToRed = function() {
          $("#bg-hold div").transition({"opacity" : "0"}, 1000, 'linear');
          $(".bg-dark-red").stop().transition({"opacity" : "1"}, 1000, 'linear');

          $(".logo-block-blue").transition({"opacity" : "0"}, 1000, 'linear');
          $(".logo-block-red").transition({"opacity" : "1"}, 1000, 'linear');
        }

        con.ShowPrizeWithLogo = function(value = 0) {
          var obj = ".logo-block-red";

          //con.TextUpdateData(obj + " .logo-gpx-prize", accounting.formatMoney(value), 1);

          $(obj + " .logo-gpx-prize").transition({"transform" : "scale(1.2)"}, 250, 'ease-out', function() {
            $(obj + " .logo-gpx-prize").transition({"transform" : "scale(1)"}, 250, 'ease-in');
          });
          
          setTimeout(function() {
            $(obj + " .logo-gpx-prize").transition({"transform" : "scale(0)"}, 250, 'ease-in');
          }, 4000);
        }

        function spin2() {
          if (!glow_spinning_condition) return;
          $(".logo-pass .logo-pass-glow").transition({
              transform: "scale(1.5) rotateZ(-360deg)",
              duration: 72000,
              easing: "linear",
              queue: false
            }, function() {
            $(".logo-pass .logo-pass-glow").css("transform", "scale(1.5) rotateZ(0deg)");
            spin2();
          });
        }

        con.RevealPass = function() {
          $("#bg-hold div").transition({"opacity" : "0"}, 1000, 'linear');
          $(".bg-pass").stop().transition({"opacity" : "1"}, 1000, 'linear');

          con.ZoomOutAllLogos();

          setTimeout(function() {
            $(".logo-pass .logo-pass-lozenge").css({"opacity" : "1", "transform" : "translateY(1000%) scale(10)"});
            $(".logo-pass .logo-pass-lozenge").transition({"transform" : "translateY(0) scale(1)"}, 250, 'ease-out', function() {
              $(".logo-pass .logo-pass-glow").css({"opacity" : "0", "transform" : "scale(0) rotateZ(0deg)"});
              $(".logo-pass .logo-pass-glow").transition({"opacity" : "1", "transform" : "scale(1.5) rotateZ(20deg)"}, 500, 'ease-out', function() {
                glow_spinning_condition = true;
                spin2();
              });
            });
          }, 500);
        }

        con.HidePassLozenge = function() {
          $(".logo-pass .logo-pass-lozenge").transition({"transform" : "translateY(1000%) scale(10)"}, 250, 'ease-out', function() {
            $(".logo-pass .logo-pass-lozenge").css("opacity", "0");
            glow_spinning_condition = false;
          });
        }

        con.HidePass = function() {
          $("#bg-hold div").transition({"opacity" : "0"}, 1000, 'linear');
          $(".bg-dark-red").stop().transition({"opacity" : "1"}, 1000, 'linear');

          $(".logo-pass .logo-pass-glow").transition({"opacity" : "0"}, 500, 'ease-out', function() {
            $(".logo-pass .logo-pass-glow").css({"transform" : "rotateZ(0deg)"});
          });

          $(".logo-pass .logo-pass-lozenge").css("opacity", "0");

          setTimeout(function() {
            con.ZoomInLogoRed();
          }, 500);
        }

        function briani() {
          if (!tp_atom_brightness_condition) return;
          $(".logo-total-prize .logo-total-prize-atom").transition({"filter" : "brightness(200%)"}, 2000, 'linear', function() {
            $(".logo-total-prize .logo-total-prize-atom").transition({"filter" : "brightness(100%)"}, 3000, 'ease-out', function() {
              briani();
            });
          });
        }

        con.RevealTotalPrize = function(value = 0) {
          $("#bg-hold div").transition({"opacity" : "0"}, 1000, 'linear');
          $(".bg-pass-dark").stop().transition({"opacity" : "1"}, 1000, 'linear');

          con.ZoomOutAllLogos();

          //con.TextUpdateData(".logo-total-prize .logo-total-prize-lozenge", accounting.formatMoney(value), 1);

          setTimeout(function() {
            $(".logo-total-prize .logo-total-prize-atom").transition({"opacity" : "1"}, 250, function() {
              tp_atom_brightness_condition = true;
              briani();
            });

            $(".logo-total-prize .logo-total-prize-lozenge").css({"opacity" : "1", "transform" : "translateY(1000%) scale(10)"});
            $(".logo-total-prize .logo-total-prize-lozenge").transition({"transform" : "translateY(0) scale(1)"}, 250, 'ease-out');
          }, 500);
        }

        con.TotalPrizeToMain = function() {
          $("#bg-hold div").transition({"opacity" : "0"}, 1000, 'linear');
          $(".bg-intro").stop().transition({"opacity" : "1"}, 1000, 'linear');

          $(".logo-total-prize .logo-total-prize-atom").stop().transition({"opacity" : "0"}, 250);

          $(".logo-total-prize .logo-total-prize-lozenge").transition({"transform" : "translateY(1000%) scale(10)"}, 250, 'ease-out', function() {
            $(".logo-total-prize .logo-total-prize-lozenge").css("opacity", "0");
            tp_atom_brightness_condition = false;
          });

          setTimeout(function() {
            var obj = ".logo-block-red";

            $(obj + " .logo-red-text-lozenge").css("transform", "scale(1)");
            $(obj + " .logo-red-text-center").css("transform", "scale(1)");
            $(obj + " .logo-red-text-above").css("opacity", "1");
            $(obj + " .logo-red-text-below").css("opacity", "1");
            con.ZoomInLogoRed();
          }, 500);
        }

        con.VidWallInit = function() {
          con.ResetVideos();
          con.PlayVideo(".bg-intro");
          con.HideAllLogos();
          con.SetupLogoMain();
          con.ZoomInLogoRed();

          $(".logo-pass-glow, .logo-pass-lozenge, .logo-total-prize-atom, .logo-total-prize-lozenge").css("opacity", 0);
        }
      
        //
      
        con.ScaleText = function(){
        }

        con.VidWallInit();
        // setTimeout(function() {
        //   con.ZoomInLogoRed();
        // }, 500);
        // setTimeout(function() {
        //   con.FFFStart();
        // }, 2500);
        // setTimeout(function() {
        //   con.FFFStop();
        // }, 4500);
        // setTimeout(function() {
        //   con.FadeFromRedToBlue();
        // }, 7500);
        // setTimeout(function() {
        //   con.FadeFromBlueToRed();
        // }, 9500);
        // setTimeout(function() {
        //   con.ShowPrizeWithLogo(10000);
        // }, 11500);
        // setTimeout(function() {
        //   con.RevealPass();
        // }, 17500);
        // setTimeout(function() {
        //   con.HidePass();
        // }, 25500);
        // setTimeout(function() {
        //   con.RevealTotalPrize(100000);
        // }, 30000);
        // setTimeout(function() {
        //   con.TotalPrizeToMain();
        // }, 34000);


        //$(".logo-block-red").css("transform", "rotateX(-60deg)");

        /*
        $(".logo-block-red").transition({
            rotateX: "-60deg"
        }, 1000);
        */
      
        //

        onValue(ref(db, dbKey), (snapshot) => {
            const data = snapshot.val();

            if(data.reload == 1) {
              location.reload();
              upd("reload", 0);
            }     

            if(data.reload_vidwall == 1) {
              location.reload();
              upd("reload_vidwall", 0);
            }     

            con.TextUpdateData(".logo-block-red .logo-gpx-prize", accounting.formatMoney(data.question_winnings), 1);
            con.TextUpdateData(".logo-total-prize .logo-total-prize-lozenge", accounting.formatMoney(data.total_winnings), 1);

            if (data.vw_zoom_out_logos == 1) {
              con.ZoomOutAllLogos();
              upd("vw_zoom_out_logos", 0);
            }
            if (data.vw_host_entrance == 1) {
              con.HostEntranceLogoRed();
              upd("vw_host_entrance", 0);
            }
            if (data.vw_zoom_in_main == 1) {
              con.SetupLogoMain();
              con.ZoomInLogoRed();
              upd("vw_zoom_in_main", 0);
            }
            if (data.vw_start_intro_cont == 1) {
              con.IntroCont();
              upd("vw_start_intro_cont", 0);
            }
            if (data.vw_stop_intro_cont == 1) {
              con.StopIntroCont();
              upd("vw_stop_intro_cont", 0);
            }
            if (data.vw_start_fff == 1) {
              con.FFFStart();
              upd("vw_start_fff", 0);
            }
            if (data.vw_ready_to_answer_fff == 1) {
              con.FFFReadyToAnswer();
              upd("vw_ready_to_answer_fff", 0);
            }
            if (data.vw_start_answering_fff == 1) {
              con.FFFStartAnswer();
              upd("vw_start_answering_fff", 0);
            }
            if (data.vw_stop_answering_fff == 1) {
              con.FFFStopAnswer();
              upd("vw_stop_answering_fff", 0);
            }
            if (data.vw_stop_fff == 1) {
              con.FFFStop();
              upd("vw_stop_fff", 0);
            }
            if (data.vw_setup_logo_red_empty == 1) {
              con.SetupLogoRedEmpty();
              upd("vw_setup_logo_red_empty", 0);
            }
            if (data.vw_red_to_blue == 1) {
              con.FadeFromRedToBlue();
              upd("vw_red_to_blue", 0);
            }
            if (data.vw_blue_to_red == 1) {
              con.FadeFromBlueToRed();
              upd("vw_blue_to_red", 0);
            }
            if (data.vw_show_prize_with_logo == 1) {
              con.ShowPrizeWithLogo(data.question_winnings);
              upd("vw_show_prize_with_logo", 0);
            }
            if (data.vw_reveal_pass == 1) {
              con.RevealPass();
              upd("vw_reveal_pass", 0);
            }
            if (data.vw_hide_pass_lozenge == 1) {
              con.HidePassLozenge();
              upd("vw_hide_pass_lozenge", 0);
            }
            if (data.vw_hide_pass == 1) {
              con.HidePass();
              upd("vw_hide_pass", 0);
            }
            if (data.vw_reveal_total_prize == 1) {
              con.RevealTotalPrize(data.total_winnings);
              upd("vw_reveal_total_prize", 0);
            }
            if (data.vw_total_prize_to_main == 1) {
              con.TotalPrizeToMain();
              upd("vw_total_prize_to_main", 0);
            }
            
            con.ScaleText();
        });           

    }(window.CONTROLLER = window.CONTROLLER || {}));
});