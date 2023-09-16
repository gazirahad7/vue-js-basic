<template>
  <div class="container">
    <h2>Create User</h2>

    <form @submit.prevent="createUser">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="newUser.name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="newUser.email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          v-model="newUser.phone"
          required
        />
      </div>
      <div class="mb-3">
        <label for="website" class="form-label">Website</label>
        <input
          type="text"
          class="form-control"
          id="website"
          v-model="newUser.website"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Create User</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateUser",

  data() {
    return {
      newUser: {
        name: "",
        phone: "",
        email: "",
        website: "",
      },
    };
  },

  methods: {
    createUser() {
      console.log(this.newUser);

      axios
        .post("https://jsonplaceholder.typicode.com/users", this.newUser)
        .then((response) => {
          console.log("User created:", response.data);
          // Redirect to the user list page
          this.$router.push({ name: "users" });
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    },
  },
};
</script>
