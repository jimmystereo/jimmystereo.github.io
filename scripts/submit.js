import Vue from 'vue'
import App from './App.vue'
import {
    firestorePlugin
} from 'vuefire'
import {
    db
} from './db'

const fStore = db.firestore()
Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
new Vue({
    el: '#contact',
    data: {
        name: '',
        subject: '',
        email: '',
        message: ''
    },
    methods: {
        addMessage: function () {
            if (this.message === '') return

            // Add message to firestore
            fStore.collection('Message').add({
                    'name': this.name,
                    'subject': this.subject,
                    'email': this.email,
                    'message': this.message,
                    'createTime': firebase.firestore.Timestamp.fromDate(new Date())
                })
                .then(() => {
                    this.message = ''
                })
        }
    }
})