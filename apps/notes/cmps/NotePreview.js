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

<div  class="trns-effect pin-btn-container" @click="onTogglePin(cmp)">
    <div :class="addClass" class="tst">
        <button :class="addClass" class="pin-btn action-btn material-symbols-outlined">push_pin</button>
    </div>
</div>
<component :is="cmp.type" :info="cmp.info"
/>
<section class="trns-effect actions">
    <button class=" action-btn material-symbols-outlined" @click="onRemove(cmp.id)">delete</button>
</section>
    `,
    created(){
    },
    methods: {
        onRemove(noteId){
            eventBus.emit('remove', noteId)
        },
        onTogglePin(note){
            eventBus.emit('TogglePin', note)
        }
    },
    computed:{
         addClass(){
            return{ 
                pinned: this.cmp.isPinned
            }
         }
    },
    components:{
        NoteTxt,
        NoteImg,
        NoteVideo,
        NoteTodos,
        NoteMail,
    }

}