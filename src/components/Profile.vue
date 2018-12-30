<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <h1>Update Profile</h1>

        <form @submit.prevent="save(user)">
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
          </div>

          <div class="text-center">
            <button class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.fetchCurrentUser()
    },
    data() {
      return {
        user: {
          name: null,
          email: null,
        },
        errors: {
          name: [],
          email: [],
        },
      }
    },
    methods: {
      fetchCurrentUser() {
        this.user = Store.getters.getCurrentUser
      },
      save(user) {
        axios.put(API.user, user)
          .then(response => {
            let successMessage = response.data.message

            alert(successMessage)

            Store.dispatch('getCurrentUser')
          })
          .catch(error => {
            let data = error.response.data

            for (let key in this.errors) {
              // reset all errors
              this.errors[key] = []

              let errorMessage = data[key]

              if (errorMessage)
                this.errors[key] = errorMessage
            }
          })
      }
    },
  }
</script>
