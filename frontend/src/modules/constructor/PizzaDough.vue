<template>
	<label class="dough__input"
		v-for="dough in doughList"
		:key="dough.id"
		:class="`dough__input--${dough.value}`"					
	>
		<input 
			type="radio" 
			name="dough" 
			:value="dough.value" 
			class="visually-hidden" 
			:checked="dough.value === modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
		/>		
		<b>{{ dough.name }}</b>
		<span>{{ dough.description }}</span>
	</label>
</template>

<script setup>
const props = defineProps({
	doughList: {
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

.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("@/assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("../img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>