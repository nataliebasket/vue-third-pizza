<template>
  <main class="content">
    <form action="#" method="post">

      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

		<div class="content__dough">
			<div class="sheet">
				<h2 class="title title--small sheet__title">Выберите тесто</h2>
				<div class="sheet__content dough">
					<pizza-dough 
						:doughList="state.doughList"
						v-model="pizza.dough"
					/>
				</div>
			</div>
		</div>

		<div class="content__diameter">
			<div class="sheet">
				<h2 class="title title--small sheet__title">Выберите размер</h2>
				<div class="sheet__content diameter">
					<pizza-size 
						:sizeList="state.sizeList"
						v-model="pizza.size"
					/>
				</div>
			</div>
		</div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

            <div class="sheet__content ingredients">

              <div class="ingredients__sauce">
                <p>Основной соус:</p>
				<pizza-sauce 
					:sauceList="state.sauceList"
					v-model="pizza.sauce"
				/>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>
				<pizza-ingredient 
					:ingredientList="state.ingredientList"
					:counts="pizza.ingredients"
					@increment="increment"
					@decrement="decrement"
				/>
              </div>

            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input 
				type="text" 
				name="pizza_name" 
				v-model="pizza.name"
				placeholder="Введите название пиццы"
			/>
          </label>

		  <pizza-content 
		  	v-model="pizza"
		  />

          <div class="content__result">
            <p>Итого: {{ price }} ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>

      </div>

    </form>
	<p>Пицца: {{ pizza }}</p>
  </main>
</template>

<script setup>
import { reactive, computed, ref } from 'vue'

import PizzaDough from '@/modules/constructor/PizzaDough.vue'
import PizzaSize from '@/modules/constructor/PizzaSize.vue'
import PizzaSauce from '@/modules/constructor/PizzaSauce.vue'
import PizzaIngredient from '@/modules/constructor/PizzaIngredient.vue'
import PizzaContent from '@/modules/constructor/PizzaContent.vue'

import doughJSON from '@/mocks/dough.json'
import sizesJSON from '@/mocks/sizes.json'
import ingredientsJSON from '@/mocks/ingredients.json'
import saucesJSON from '@/mocks/sauces.json'

import { 
	normalizeDough, 
	normalizeSize, 
	normalizeSauce,
	normalizeIngredient 
} from '@/common/helpers/normalize';

const state = reactive({
	doughList: doughJSON.map(normalizeDough),
	sizeList: sizesJSON.map(normalizeSize),
	sauceList: saucesJSON.map(normalizeSauce),
	ingredientList: ingredientsJSON.map(normalizeIngredient)
})

console.log(state.doughList)


const pizza = reactive({
	name: '',
	dough: state.doughList[0].value,
	size: state.sizeList[0].value,
	sauce: state.sauceList[0].value,
	ingredients: state.ingredientList.reduce((result, ingredient) => {
		return {
			...result,
			[ingredient.value]: 0,
		}
	}, {})
})


const increment = (ingredient) => {
	pizza.ingredients[ingredient]++
}
const decrement = (ingredient) => {
	pizza.ingredients[ingredient]--
}



const price = computed (() => {
	let multiplier = state.sizeList.find(item => item.value === pizza.size).multiplier
	let dough = state.doughList.find(item => item.value === pizza.dough).price
	let sauce = state.sauceList.find(item => item.value === pizza.sauce).price
	let ingridients = state.ingredientList.reduce((acc, item) => {
		return acc + item.price * pizza.ingredients[item.value]
	}, 0)
	return 	multiplier * (dough + sauce + ingridients)
			
})

const getImage = image => {
	return new URL(`../assets/img/${image}`, import.meta.url).href
}

const props = defineProps({
	doughList: {
		type: Array,
		required: true
	},
	sizeList: {
		type: Array,
		required: true
	},
	ingredientList: {
		type: Array,
		required: true
	},
	sauceList: {
		type: Array,
		required: true
	}
})

defineEmits(["update:modelValue"])

</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds";
@import "@/assets/scss/mixins/mixins.scss";

.content {
  padding-top: 20px;
}

.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}

.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}

.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;

  color: $black;

  &--big {
    @include b-s36-h42;
  }

  &--small {
    @include b-s18-h21;
  }
}

.sheet {
  padding-top: 15px;

  border-radius: 8px;
  background-color: $white;
  box-shadow: $shadow-light;
}

.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}

.sheet__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.button {
  $bl: &;

  @include b-s18-h21;
  font-family: inherit;
  display: block;

  box-sizing: border-box;
  margin: 0;
  padding: 0;

  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  color: $white;
  border: none;
  border-radius: 8px;
  outline: none;
  box-shadow: $shadow-medium;

  background-color: $green-500;

  &:hover:not(:active):not(:disabled) {
    background-color: $green-400;
  }

  &:active:not(:disabled) {
    background-color: $green-600;
  }

  &:focus:not(:disabled) {
    opacity: 0.5;
  }

  &:disabled {
    background-color: $green-300;
    color: rgba($white, 0.2);
    cursor: default;
  }

  &--border {
    background-color: transparent;
    border: 1px solid $green-500;
    color: $black;
    box-shadow: none;

    &:hover:not(:active):not(:disabled) {
      color: $green-500;
      border-color: $green-500;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: $green-600;
      border-color: $green-600;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.5;
    }
  }

  &--transparent {
    @include b-s14-h16;
    background-color: transparent;
    box-shadow: none;
    color: $black;

    &:hover:not(:active):not(:disabled) {
      color: $red-800;
      background-color: transparent;
    }

    &:active:not(:disabled) {
      color: $red-900;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.25;
    }
  }

  &--arrow {
    &::before {
      content: "";
      background-image: url("../img/button-arrow.svg");
      background-position: center;
      background-repeat: no-repeat;
      margin-right: 16px;
      width: 18px;
      height: 18px;
      display: inline-block;
      vertical-align: middle;
      transform: translateY(-1px);
    }
  }

  &--white {
    background-color: $white;
    color: $green-500;
  }
}

.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}
</style>




