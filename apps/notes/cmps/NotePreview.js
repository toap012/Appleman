import NoteTxt from "./NoteTxt.js";
import NoteImg from "./NoteImg.js";
import NoteVideo from "./NoteVideo.js";
import NoteTodos from "./NoteTodos.js";


export default{
    name:
    'NotePreview',
    props: ['cmp'],
    template:`
 
        <component :is="cmp.type" :info="cmp.info"
        @changeInfo="updateNote" />
 
    `,
    created(){
        console.log(this.cmp);
    },
    components:{
        NoteTxt,
        NoteImg,
        NoteVideo,
        NoteTodos,
    }

}