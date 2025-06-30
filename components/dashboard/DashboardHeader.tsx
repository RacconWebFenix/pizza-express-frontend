"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { DASHBOARD_CONSTANTS } from "../../constants/dashboard";

const MotionBox = motion(Box);

export function DashboardHeader() {
  const { TITLES, MESSAGES, ANIMATIONS } = DASHBOARD_CONSTANTS;

  return (
    <MotionBox
      initial={ANIMATIONS.FADE_IN.initial}
      animate={ANIMATIONS.FADE_IN.animate}
      transition={ANIMATIONS.FADE_IN.transition}
      textAlign="center"
      mb={8}
    >
      <Heading
        fontSize={{ base: "2xl", md: "4xl" }}
        color="brand.dark"
        mb={2}
        fontWeight="bold"
      >
        {TITLES.MAIN}
      </Heading>
      <Text
        fontSize={{ base: "md", md: "lg" }}
        color="brand.medium"
        fontWeight="medium"
      >
        {MESSAGES.WELCOME}
      </Text>
    </MotionBox>
  );
}
