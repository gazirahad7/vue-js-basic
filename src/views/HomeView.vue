<template>
  <main>
    <h1 ref="title" class="text-primary">This is home page</h1>

    <p>Default : {{ name }} and {{ age }}</p>
    <p>Refs: {{ nameRef }}</p>

    <button class="btn btn-info" @click="handleClick">Change Title</button>

    <ParentComponent />

    <div>
      <button @click="openModal" class="btn btn-primary">Open Modal</button>
      <div class="overlay" id="overlay"></div>

      <!-- Modal component -->
      <div class="modal" id="myModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal Title</h5>
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
              <p>This is the modal content.</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
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
  </main>
</template>
<script>
import { ref } from "vue";
import ParentComponent from "../components/ParentComponent.vue";
export default {
  el: "#app",
  components: {
    ParentComponent,
  },

  setup() {
    console.log("setup");

    let name = "Gazi Rahad";
    const age = 24;
    const title = ref(null);

    let nameRef = ref("Name Reactive");
    console.log(title.value);

    const handleClick = () => {
      console.log(title, title.value);
      title.value.classList.add("bg-danger");
      title.value.textContent = "Change title ";
      nameRef.value = "Yes its reactive";
    };

    return { name, age, title, nameRef, handleClick };
  },

  methods: {
    openModal() {
      console.log("modal");

      const modal = document.getElementById("myModal");
      modal.classList.add("show");
      modal.style.display = "block";
      document.body.classList.add("modal-open");

      // Show the overlay
      const overlay = document.getElementById("overlay");
      overlay.style.display = "block";
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
  },
};
</script>
<style>
.overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
.modal {
  z-index: 10000;
}
</style>
