
<form class="step_screen drawscreen_section form__butsection" action="/updateproject.php" enctype='multipart/form-data' id="drawscreen_section_three">

   </div>
<!--     <input type="hidden" value="drawscreen_section_three" name="step" class="step">
    <input type="hidden" value="" name="wall" class="wall">
    <input type="hidden" value="" name="id" class="id">
    <input type="hidden" value="" name="room" class="room">
    <input type="hidden" value="" name="settings" class="settings">
    <input type="hidden" value="" name="mittapisteet" class="mittapisteet">
    <input type="hidden" value="" name="aukot" class="aukot">
    <input type="hidden" value="" name="reijat" class="reijat">
    <input type="hidden" value="" name="saumat" class="saumat">
    <input type="hidden" value="" name="levyt" class="levyt">
    <input type="hidden" value="" name="rangat" class="rangat">
    <input type="hidden" value="" name="listat" class="listat">
    <input type="hidden" value="" name="kokonaisalue" class="kokonaisalue">
    <input type="hidden" value="" name="levytettava_alue" class="levytettava_alue">
    <input type="hidden" value="" name="poisjaava_alue" class="poisjaava_alue">
    <input type="hidden" value="" name="keskusmittapiste_cord" class="keskusmittapiste_cord">
    <input type="hidden" value="" name="reklamaatiot" class="reklamaatiot"> -->
    <section class="nav">
      <nav>
        <ul>
         <li><div onclick="refresh__drawcontrols();updatearea();$('#step_drawscreen').val('rooms');">Ristivalikkoon</div></li>
           <li><div onclick="refresh__drawcontrols();updatearea();$('#step_drawscreen').val('drawscreen_section_one');" class="nav__comleted">Origo</div></li>
          <li><div onclick="refresh__drawcontrols();updatearea();$('#step_drawscreen').val('drawscreen_section_two');" class="nav__comleted">Aukot</div></li>
          <li><div onclick="refresh__drawcontrols();updatearea();$('#step_drawscreen').val('drawscreen_section_three');" class="nav_current">Läpiviennit</div></li>
          <li><div onclick="refresh__drawcontrols();updatearea();$('#step_drawscreen').val('drawscreen_section_four');">Saumat</div></li>
          <li><div onclick="refresh__drawcontrols();updatearea();$('#step_drawscreen').val('drawscreen_section_five');">Ladonta</div></li>
          <li><div onclick="refresh__drawcontrols();updatearea();$('#step_drawscreen').val('drawscreen_section_tyostot');">Kiinnikkeet</div></li>
          <li><div onclick="alert('Onnistuu kiinnikkeet-kohdasta');">Seinät</div></li>
          <li><div onclick="refresh__drawcontrols();updatearea();$('#step_drawscreen').val('drawscreen_section_esikatselu');">Levyt</div></li>
          <li><div onclick="refresh__drawcontrols();updatearea();$('#step_drawscreen').val('drawscreen_section_six');">Rangat</div></li>
          <li><div onclick="refresh__drawcontrols();updatearea();$('#step_drawscreen').val('drawscreen_section_seven');">Listat</div></li>
          <li><div onclick="refresh__drawcontrols();updatearea();$('#step_drawscreen').val('project_start');">Päävalikkoon</div></li>
          <!-- <li><div onclick="refresh__drawcontrols();updatearea();$('#step_drawscreen').val('drawscreen_section_four');">Seuraava</div></li> -->

        
        </ul>
      </nav>
    </section>
    <div class="modal-container lv_modal">
     <div class="modal-background">
       <div class="modal">
          <div class="modal_close_btn"><svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 1.87367L17.9857 0.0703049L10 7.21983L2.01429 0.0703049L0 1.87367L7.98572 9.0232L0 16.1727L2.01429 17.9761L10 10.8266L17.9857 17.9761L20 16.1727L12.0143 9.0232L20 1.87367Z" fill="#444444"/></svg></div>
          
         <section class="row">
            <div class="col-6"><h2><input type="text" value="Läpivienti " class="lineinput" id="lv__name"></h2></div>
            <div class="col-6">
               <fieldset class="modal__lvtypes">
                <input name="lv__sade" type="radio" id="lapiviennit__sade_first" onchange="change__lapivienti_sizecord(this);" value="25">
                <label for="lapiviennit__sade_first">25</label>
                <input name="lv__sade" type="radio" id="lapiviennit__sade_second" onchange="change__lapivienti_sizecord(this);" value="50">
                <label for="lapiviennit__sade_second">50</label>
                <input name="lv__sade" type="radio" id="lapiviennit__sade_third" onchange="change__lapivienti_sizecord(this);" value="75">
                <label for="lapiviennit__sade_third">75</label>
                <input name="lv__sade" type="radio" id="lapiviennit__sade_fourth" onchange="change__lapivienti_sizecord(this);" value="100">
                <label for="lapiviennit__sade_fourth">100</label>
                <input name="lv__sade" type="radio" id="lapiviennit__sade_fifth" onchange="change__lapivienti_sizecord(this);" value="125">
                <label for="lapiviennit__sade_fifth">125</label>

                <input type="tel" placeholder="arvo..." id="lapiviennit__sade_muucord" value="75"></fieldset>

             </div>
            
            
         </section>

         <section>
           <h4>Lisään läpiviennin</h4>
           <fieldset>
               <input name="lv_from" type="radio" onfocus="give__origo_cord();" id="from__origo_lapivienti">
               <label for="from__origo_lapivienti">Origosta</label>
               <input name="lv__distances" type="radio" id="lvfrom__checkpoint_1" onfocus="get_from_custom_mp(1);">
               <label for="lvfrom__checkpoint_1">Mittapisteestä 1</label>
               <input name="lv__distances" type="radio" id="lvfrom__checkpoint_2" onfocus="get_from_custom_mp(2);">
               <label for="lvfrom__checkpoint_2">Mittapisteestä 2</label>
               <input name="lv_from" type="radio" id="from__side_lapivienti" onfocus="null__origo_cord();">
               <label for="from__side_lapivienti">Omat mitat</label>
            </fieldset>
            <section class="row cord">
               <div class="col-6" style="display: flex;flex-direction: column;">
                  <div class="lvcord__item cord__item">
                     <label for="lvcord_low">Ylös</label>
                     <input id="lvcord_low" name="" type="tel" class="lineinput" onchange="change__newdiv_cord();cord__check(this);">
                  </div>
                  
                  <div class="lvcord__item cord__item" style="display: none;">
                     <label for="lvcord_r">Oikealle</label>
                     <input id="lvcord_r" name="" type="tel" class="lineinput" onchange="change__newdiv_cord();cord__check(this);">
                  </div>
               </div>
              <div class="col-6">
                  <div class="lvcord__item cord__item">
                     <label for="lvcord_left">Oikealle</label>
                     <input id="lvcord_left" name="" type="tel" class="lineinput" onchange="change__newdiv_cord();cord__check(this);">
                  </div>
                 <div id="setting__canvas_lapiviennit" class="setting__canvas">
                    
                 </div>
              </div>
            </section>
         </section>

         <section class="comment__section">
           <h4>Lähetä kommentti</h4>
           <textarea name="lv_comment" id="lv_comment" cols="30" rows="10" style="resize: none;"></textarea>
           <div class="row">
              <div class="col-6">
                 <h6>Keneltä</h6>
                 <input name="lv_comment_from" id="lv_comment_from" type="text" value="<?php echo $_GET['user']; ?>">
              </div>
              <div class="col-6">
                 <h6>Kenelle</h6>
                 <select name="lv_comment_to" id="lv_comment_to">
                    <option value="Jari">Jari</option>
                    <option value="Henkka">Henkka</option>
                    <option value="Marko">Marko</option>
                  </select>
              </div>
           </div>
         </section>
         <div class="modal_close_btn drawarea__controls_btn" onclick="mitta__create_mitta()">Lisää läpivienti</div>
       </div>
     </div>
    </div>
</form>



