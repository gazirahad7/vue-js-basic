<template>
  <div>
    <button class="btn btn-info" @click="store.count++">
      Counter APP two: {{ store.count }}
    </button>
  </div>
  <div>
    <h3>Child component</h3>

    <p>{{ childProp }}</p>
  </div>
</template>

<script>
import { store } from "../store/store";
export default {
  props: {
    childProp: String,
  },

  data() {
    return {
      store,
    };
  },
};
</script>
