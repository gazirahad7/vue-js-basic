<template>
  <div>
    <h1>Dynamic Router</h1>
    <h3>Single user ID: {{ $route.params.id }}</h3>
    <h5>{{ user.name }}</h5>
  </div>
</template>
<script>
import axios from "axios";

export default {
  // props: ["id"],
  data() {
    return {
      user: {},
    };
  },

  mounted() {
    console.log("working");
    this.getUser();
  },
  methods: {
    getUser() {
      // console.log(props);
      const userId = this.$route.params.id;
      console.log(userId);
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((res) => {
          console.log(res.data);
          this.user = res.data;
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    },
    deleteUser(id) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(() => {
          this.users = this.users.filter((user) => user.id !== id);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    },
  },
};
</script>
