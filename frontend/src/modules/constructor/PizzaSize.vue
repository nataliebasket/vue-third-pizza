<template>
	<label class="diameter__input"
		v-for="size in sizeList"
		:key="size.id"
		:class="`diameter__input--${size.value}`"
	>
		<input 
			type="radio" 
			name="diameter" 
			:value="size.value" 
			class="visually-hidden"
			:checked="size.value === modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
		>
		<span>{{ size.name }}</span>
	</label>
</template>

<script setup>
const props = defineProps({
	sizeList: {
		type: Array,
		required: true
	},
	modelValue: {
		type: String,
		required: true
	}
})

defineEmits(["update:modelValue"]);

</script>
<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds";
@import "@/assets/scss/mixins/mixins.scss";

.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;

  cursor: pointer;

  span {
    @include r-s16-h19;

    position: relative;

    padding-left: 46px;

    &::before {
      @include p_center_v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-color: $green-100;
      background-image: url("../img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>