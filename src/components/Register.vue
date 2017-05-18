<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <h1>Register Form</h1>

                <form @submit.prevent="register(user)">
                    <div class="text-left">
                        <div class="form-group" :class="{ 'has-error': errors.name.length }">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name" placeholder="Your name" v-model="user.name">
                            <p class="help-block" v-for="error in errors.name">{{ error }}</p>
                        </div>

                        <div class="form-group" :class="{ 'has-error': errors.email.length }">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="Your email" v-model="user.email">
                            <p class="help-block" v-for="error in errors.email">{{ error }}</p>
                        </div>

                        <div class="form-group" :class="{ 'has-error': errors.password.length }">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Your password" v-model="user.password">
                            <p class="help-block" v-for="error in errors.password">{{ error }}</p>
                        </div>

                        <div class="form-group" :class="{ 'has-error': errors.password_confirmation.length }">
                            <label for="password_confirmation">Password Confirmation</label>
                            <input type="password" class="form-control" id="password_confirmation" placeholder="Your password confirmation" v-model="user.password_confirmation">
                            <p class="help-block" v-for="error in errors.password_confirmation">{{ error }}</p>
                        </div>
                    </div>

                    <div class="text-center">
                        <button class="btn btn-primary">Register</button>

                        <br><br>

                        <router-link class="btn btn-default" :to="{ name: 'Index' }">
                            Index
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    name: null,
                    email: null,
                    password: null,
                    password_confirmation: null,
                },
                errors: {
                    name: [],
                    email: [],
                    password: [],
                    password_confirmation: [],
                },
            }
        },
        methods: {
            resetUser() {
                this.user = {
                    name: null,
                    email: null,
                    password: null,
                    password_confirmation: null,
                }
            },
            register(user) {
                axios.post(API.register, user)
                    .then(response => {
                        this.resetUser()

                        let successMessage = response.data.message

                        alert(successMessage)
                    })
                    .catch(error => {
                        let data = error.response.data

                        for(let key in this.errors) {
                            // reset all errors
                            this.errors[key] = []

                            let errorMessage = data[key]

                            console.log('key', key)
                            console.log('errorMessage', errorMessage)

                            if(errorMessage)
                                this.errors[key] = errorMessage
                        }
                    })
            }
        },
    }
</script>
