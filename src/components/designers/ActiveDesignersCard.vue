<template>
  <ProfessionalCard
    :professional="designer"
    detailsRouteName="details-designer"
    fallbackMalePhoto="/default-design-male.png"
    fallbackFemalePhoto="/default-design-female.png"
    cardClass="active-card"
    nameKey="firstName"
    skillsKey="skills"
    emptyName="Unnamed Designer"
    emptySkills="No skills listed"
  />
</template>

<script setup>
import ProfessionalCard from "@/components/ProfessionalCard.vue";

defineProps({
  designer: {
    type: Object,
    required: true
  }
});
</script>