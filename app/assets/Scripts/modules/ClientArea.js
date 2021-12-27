
import { Axios } from "axios"
class ClientArea {
    constructor(){
        this.injectHtml()
        this.form = document.querySelector(".client-area__form")
        this.field = document.querySelector(".client-area__input")
        this.contentArea = document.querySelector(".client-area__content-area")
        this.events()
    }

    events(){
        this.form.addEventListener("submit", e=>{
            e.preventDefault();
            this.sentRequest();
        })
    }

    sentRequest(){
        let url = 'https://inspiring-curie-897b58.netlify.app/.netlify/functions/secret-area'
        let pass={ password: this.field.value }
        Axios.post(url , pass).then(
            response=>{
                this.form.remove()
                this.contentArea.innerHTML = response.data
            }
        ).catch(
            ()=> {
                this.contentArea.innerHTML = `<p class="client-area__error">try again</p>`
                this.field.value=''
                this.field.focus()
            })
    }

    injectHtml(){
        document.body.insertAdjacentHTML('beforeend', `
        <div class="client-area">
            <div class="wrapper wrapper__medium">
                <h2 class="section-title section-title__blue">Secret Client Area</h2>
                <form class="client-area__form" action="">
                    <input class="client-area__input" type="text" placeholder="Enter the secret phrase">
                    <button class="btn btn__orange">Submit</button>
                </form>
                <div class="client-area__content-area"></div>
            </div>
        </div>
        `)
    }
}

export default ClientArea;