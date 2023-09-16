<template>
  <div>
    <!-- Modal -->
    <div v-if="showModal" class="modal fade show" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit User</h5>
            <button
              @click="closeModal"
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateUser">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="editedUser.name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="editedUser.email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input
                  type="text"
                  class="form-control"
                  id="phone"
                  v-model="editedUser.phone"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="website" class="form-label">Website</label>
                <input
                  type="text"
                  class="form-control"
                  id="website"
                  v-model="editedUser.website"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditUser",

  props: {
    showModal: Boolean,
    user: Object,
  },

  data() {
    return {
      editedUser: { ...this.user },
    };
  },

  methods: {
    updateUser() {
      axios
        .put(
          `https://jsonplaceholder.typicode.com/users/${this.editedUser.id}`,
          this.editedUser
        )
        .then((response) => {
          // Handle successful update, e.g., show a success message or emit an event to notify the parent component
          console.log("User updated:", response.data);
          this.closeModal();
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    },

    closeModal() {
      // Emit an event to notify the parent component to close the modal
      this.$emit("close-modal");
    },
  },
};
</script>
