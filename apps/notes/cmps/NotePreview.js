import { eventBus } from "../../../services/event-bus.service.js"; 
import NoteTxt from "./NoteTxt.js";
import NoteImg from "./NoteImg.js";
import NoteVideo from "./NoteVideo.js";
import NoteTodos from "./NoteTodos.js";
import NoteMail from "./NoteMail.js";

export default{
    name:
    'NotePreview',
    props: ['cmp'],
    template:`
<section class="note-preview" v-if="cmp" :style="changeBgClr">

    <div  class="trns-effect pin-btn-container" @click="onTogglePin(cmp)">
        <div :class="addClass" class="tst">
            <button :class="addClass" class="pin-btn action-btn material-symbols-outlined">push_pin</button>
        </div>
    </div>
    <component :is="cmp.type" :info="cmp.info"
    />
</section>
<section class="trns-effect actions" >
    <button class=" action-btn material-symbols-outlined" @click="onRemove(cmp.id)">delete</button>
    <button class=" action-btn material-symbols-outlined" @click="onOpenPalette">palette</button>
    <section v-if="isPalette" class="palette-options">
        <div class="palette-option" v-for="paletteOption in paletteOptions" @click="onSetBgClr(paletteOption,cmp)" :style="{backgroundColor:paletteOption}" >
        </div>
    </section>
</section>
    `,
    data(){
        return{
            isPalette:false,
            paletteOptions:['#ff6633','#ccffcc','#ffffcc','#eeeeee','#8dff76','#a9ffc6','#72dbff','#fdff46'],
        }
    },
    created(){
    },
    methods: {
        onRemove(noteId){
            eventBus.emit('remove', noteId)
        },
        onTogglePin(note){
            eventBus.emit('TogglePin', note)
        },
        onOpenPalette(){
            this.isPalette = !this.isPalette
        },
        onSetBgClr(clr,note){
            this.cmp.style.backgroundColor = clr
            // const newNote = JSON.parse(JSON.stringify(note))
            eventBus.emit('setBgClr',note)
            this.isPalette = false

        }
    },
    computed:{
         addClass(){
            return{ 
                pinned: this.cmp.isPinned
            }
         },
         changeBgClr(){
            return {backgroundColor:this.cmp.style.backgroundColor}
            
         },
    },
    components:{
        NoteTxt,
        NoteImg,
        NoteVideo,
        NoteTodos,
        NoteMail,
    }

}