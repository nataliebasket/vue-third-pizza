<template>
	<ul class="ingredients__list">
		<li class="ingredients__item"
			v-for="ingredient in ingredientList"
			:key="ingredient.id"
		>
			<span 
				:class="`filling filling--${ingredient.value}`">
					{{ ingredient.name }}
			</span>

			<counter
				:count = "counts[ingredient.value]"
				:ingredient = "ingredient.value"
				@increment = "$emit('increment', $event)"
				@decrement = "$emit('decrement', $event)"
			/>

		</li>
	</ul>
</template>

<script setup>
import counter from './Counter.vue'

const props = defineProps({
	ingredientList: {
		type: Array,
		required: true
	},
	counts: {
		type: Object,
		required: true
	}
})

defineEmits(["increment", "decrement"])

</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds";
@import "@/assets/scss/mixins/mixins.scss";

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;

  }

  &--tomatoes::before {
    background-image: url("../img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("../img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("../img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("../img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("../img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("../img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("../img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("../img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("../img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("../img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("../img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("../img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("../img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("../img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("../img/filling/salmon.svg");
  }
}

</style>