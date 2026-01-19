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

        $.keyframe.define([
          {
            name: 'reset'
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
              htmlMTString += '<div class="moneyTd" id="moneyTd-t">';
            }
            else if(i == now) {
              htmlMTString += '<div class="moneyTd" id="moneyTd-nt">';
            }
            
            htmlMTString += txt;
            htmlMTString += '</div>';
            htmlMTString += '</div>';
          }
          
          $(".moneytree").html(htmlMTString);
        }
      
        //
      
        con.ScaleText = function(){
          $(".moneyTr").each(function(){
            con.SVGTextCustomize("#" + this.id + " .moneyTd"); 
          });
          con.SVGTextCustomize(".mt-cont-name");
          con.SVGTextCustomize(".mt-q-left");
          con.SVGTextCustomize(".mt-c-left");
        }
      
        con.ResetMoneytree();
        //

        onValue(ref(db, dbKey), (snapshot) => {
          const data = snapshot.val();

          con.RenderMoneytree(data.num_of_qs, data.q_now_follower, data.q_top_follower, [data.q_milestone]);
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
          con.TextUpdateData(".mt-q-left", (data.q_top - data.q_now + 1) + " CÂU HỎI", 1);
          con.TextUpdateData(".mt-c-left", data.c_left + " NGƯỜI CHƠI", 1);

          if(data.lifeline_on_pass == false) {
            $("#ll-pass .ll-used").css("opacity", 1);
          }
          else {
            $("#ll-pass .ll-used").css("opacity", 0);
          }

          con.ScaleText();
        });           

    }(window.CONTROLLER = window.CONTROLLER || {}));
});