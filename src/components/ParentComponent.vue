<template>
  <div>
    <p class="fw-bolder">Counter APP one: {{ store.count }}</p>
  </div>
  <div>
    <h2>Parent Component</h2>
    <p>{{ message }}</p>

    <ChildComponent :childProp="message" />
  </div>
</template>

<script>
import ChildComponent from "./ChildComponent.vue";

import { store } from "../store/store";
export default {
  components: {
    ChildComponent,
  },
  data() {
    return {
      message: "Hello from parent",
      store,
    };
  },
};
</script>
