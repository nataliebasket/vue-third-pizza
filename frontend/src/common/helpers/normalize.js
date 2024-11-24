import doughSizes from "@/common/data/doughSizes";
import sizes from "@/common/data/sizes";
import ingredients from "@/common/data/ingredients";
import sauces from "@/common/data/sauces";

export const normalizeDough = (dough) => {
	return { 
		...dough, 
		value: doughSizes[dough.id]
	};
}

export const normalizeSize = (size) => {
	return { 
		...size, 
		value: sizes[size.id]
	};
}

export const normalizeSauce = (sauce) => {
	return { 
		...sauce, 
		value: sauces[sauce.id]
	};
}

export const normalizeIngredient = (ingredient) => {
	return { 
		...ingredient, 
		value: ingredients[ingredient.id]
	};
}