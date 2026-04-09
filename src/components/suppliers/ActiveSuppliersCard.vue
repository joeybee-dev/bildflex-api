<template>
  <ProfessionalCard
    :professional="supplier"
    detailsRouteName="details-supplier"
    fallbackMalePhoto="/default-supplier.png"
    fallbackFemalePhoto="/default-supplier.png"
    cardClass="active-card"
    nameKey="firstName"
    skillsKey="productsOffered"
    emptyName="Unnamed Supplier"
    emptySkills="No products listed"
  />
</template>

<script setup>
import ProfessionalCard from "@/components/ProfessionalCard.vue";

defineProps({
  supplier: {
    type: Object,
    required: true
  }
});
</script>