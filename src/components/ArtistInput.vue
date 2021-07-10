<template>
  <input type="text"
          v-model="input"
          @change="enter(input)" 
          placeholder="Your favorite artist"
          class="favorite-artist"
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

<style lang="scss">
.favorite-artist {
  font-size: 30px;
  border-radius: 30px;
  padding: 10px 30px;
  width: 100%;
  box-sizing: border-box;
  border: #333 solid 1px;
  background: #333;
  color: #fff;
  margin-bottom: 20px;

  &:focus {
    outline: none;
  }
}
</style>
