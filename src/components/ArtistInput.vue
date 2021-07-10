<template>
  <input type="text"
          v-model="input"
          @change="enter(input)" 
          placeholder="Your favorite artist"
          class="text-4xl p-4 w-full my-3 box-border
                  border-b-2 bg-black border-gray-800 text-white
                  outline-none"
          autofocus />
</template>

<script>
export default {
  props: {
    input: String
  },
  setup (_, { emit }) {
    const enter = (input) => {
      emit('entered', input)
    }

    return { enter }
  }
}
</script>
