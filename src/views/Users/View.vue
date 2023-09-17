<template>
  <div class="container">
    <div class="d-flex justify-content-between my-5 py-3">
      <h2>Users</h2>

      <RouterLink to="/users/create" class="btn btn-primary pt-2">
        Add New Users</RouterLink
      >
    </div>

    <div class="my-2 d-flex align-items-center gap-2 justify-content-between">
      <!-- Search Input Field -->
      <div class="w-50 pt-4">
        <input
          type="text"
          class="form-control"
          placeholder="Searching.............."
          v-model="searchQuery"
        />
      </div>
      <!-- Sorting UI -->
      <div class="d-flex gap-2">
        <div class=" ">
          <label for="sortByField">Sort by:</label>
          <select class="form-select" id="sortByField" v-model="sortByField">
            <option disabled>Choose an Option</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="website">Website</option>
          </select>
        </div>

        <div>
          <label for="sortOrder">Order:</label>
          <select class="form-select" id="sortOrder" v-model="sortOrder">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div class="pt-4">
          <button class="btn btn-primary" @click="applySorting">
            Apply Sorting
          </button>
        </div>
      </div>
    </div>

    <div class="my-5 p-4 border rounded-4">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">SL</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Website</th>
            <!-- <th scope="col">Role</th>
            <th scope="col">Salary</th> -->
            <th scope="col " class="text-center">Action</th>
          </tr>
        </thead>
        <!-- <tbody v-if="this.users.length > 0"> -->
        <tbody v-if="filteredUsers.length > 0">
          <!-- <tr v-for="(user, index) in this.users" :key="index"> -->

          <TransitionGroup
            tag=""
            :css="true"
            @before-enter="onBeforeEnter"
            @enter="onEnter"
            @leave="onLeave"
          >
            <tr v-for="(user, index) in paginatedUsers" :key="user.id">
              <td>{{ index + 1 }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.website }}</td>

              <td class="text-center d-flex gap-2 justify-content-center">
                <RouterLink :to="'/users/' + user.id" class="btn btn-success">
                  View</RouterLink
                >
                <!-- <edit-user :user="user" /> -->
                <button @click="openModal(user.id)" class="btn btn-warning">
                  Edit
                </button>

                <button @click="confirmDelete(user.id)" class="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          </TransitionGroup>
        </tbody>

        <tbody v-else>
          <tr>
            <!-- <td  colspan="5">Loading.....</td> -->

            <td colspan="5">No matching users found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-end">
      <paginate
        :list="filteredUsers"
        :page-count="pageCount"
        :page-range="pageRange"
        :margin-pages="marginPages"
        v-model="currentPage"
        @page-changed="handlePageChange"
        :click-handler="clickCallback"
      />
    </div>
  </div>
  <!--  Markup  Modal-->
  <div>
    <div class="overlay" id="overlay"></div>

    <!-- Modal component -->
    <div class="modal" id="myModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Update User Info for '{{ singleUser?.name }}'
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- Modal content goes here -->

            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="singleUser.name"
                />
              </div>

              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="singleUser.email"
                />
              </div>

              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Phone</label>
                <input
                  type="tel"
                  class="form-control"
                  v-model="singleUser.phone"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label"
                  >Website</label
                >
                <input
                  type="text"
                  class="form-control"
                  v-model="singleUser.website"
                />
              </div>

              <button
                @click.prevent="updateUser(this.singleUser.id)"
                type="submit"
                class="btn btn-primary"
              >
                Update
              </button>
            </form>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              data-dismiss="modal"
              @click="closeModal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import Paginate from "vuejs-paginate-next";

import gsap from "gsap";

export default {
  name: "users",

  components: {
    paginate: Paginate,
  },

  data() {
    return {
      users: [],
      singleUser: {},
      searchQuery: "",
      currentPage: 1,
      paginationOptions: {
        perPage: 5,
        pageRange: 3,
        marginPages: 2,
      },
      sortByField: "name", // Default field for sorting
      sortOrder: "asc", // Default sort order
    };
  },

  computed: {
    filteredUsers() {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        return this.users;
      } else {
        return this.users.filter((user) => {
          return (
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.phone.toLowerCase().includes(query) ||
            user.website.toLowerCase().includes(query)
          );
        });
      }
    },

    startIndex() {
      return (this.currentPage - 1) * this.paginationOptions.perPage;
    },
    endIndex() {
      return this.startIndex + this.paginationOptions.perPage;
    },
    paginatedUsers() {
      return this.filteredUsers.slice(this.startIndex, this.endIndex);
    },
    // Calculate the number of pages dynamically
    pageCount() {
      return Math.ceil(
        this.filteredUsers.length / this.paginationOptions.perPage
      );
    },

    // Calculate other pagination options dynamically
    pageRange() {
      return this.paginationOptions.pageRange;
    },
    marginPages() {
      return this.paginationOptions.marginPages;
    },
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    handlePageChange(newPage) {
      this.currentPage = newPage;
    },
    clickCallback(pageNum) {
      console.log(pageNum);
    },
    getUsers() {
      axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
        this.users = res.data;
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
    openEditModal(index) {
      this.selectedUser = { ...this.users[index] };
      this.showEditModal = true;
    },

    confirmDelete(id) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (confirmed) {
        this.deleteUser(id);
        toast.success("Deleted successful", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    },
    async viewSingleUser(id) {
      const user = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      return user.data;
    },
    async updateUser(id) {
      try {
        const res = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          this.singleUser
        );
        const updatedUserIndex = this.users.findIndex((user) => user.id === id);
        if (updatedUserIndex !== -1) {
          this.users[updatedUserIndex] = res.data;
        }
        if (res.status === 200) {
          toast.success("Updated successful", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        //  this.getUsers();
      } catch (error) {
        console.error("Error updating user", error);
      }
    },

    async openModal(id) {
      const modal = document.getElementById("myModal");
      modal.classList.add("show");
      modal.style.display = "block";
      document.body.classList.add("modal-open");

      // Show the overlay
      const overlay = document.getElementById("overlay");
      overlay.style.display = "block";
      const user = await this.viewSingleUser(id);
      this.singleUser = user;
    },
    closeModal() {
      const modal = document.getElementById("myModal");
      modal.classList.remove("show");
      modal.style.display = "none";
      document.body.classList.remove("modal-open");

      // Hide the overlay
      const overlay = document.getElementById("overlay");
      overlay.style.display = "none";
    },
    applySorting() {
      this.filteredUsers.sort((a, b) => {
        const fieldA = a[this.sortByField].toLowerCase();
        const fieldB = b[this.sortByField].toLowerCase();
        let comparison = 0;

        if (fieldA > fieldB) {
          comparison = 1;
        } else if (fieldA < fieldB) {
          comparison = -1;
        }

        return this.sortOrder === "desc" ? comparison * -1 : comparison;
      });
    },

    onBeforeEnter(el) {
      el.style.opacity = 0;
      //el.style.height = 0;
    },

    onEnter(el, done) {
      gsap.to(el, {
        opacity: 1,
        // height: "1.6em",
        delay: el.dataset.index * 0.15,
        onComplete: done,
      });
    },

    onLeave(el, done) {
      gsap.to(el, {
        opacity: 0,
        // height: 0,
        delay: el.dataset.index * 0.15,
        onComplete: done,
      });
    },
  },
};
</script>
