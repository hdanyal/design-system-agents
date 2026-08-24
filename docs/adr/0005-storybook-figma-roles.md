# ADR 0005: Storybook and Figma roles

- Status: accepted
- Date: 2026-08-17

## Context

Visual exploration and coded truth must not compete.

## Decision

Storybook is coded truth and the accessibility catalog. Figma is exploration and the future library surface. Shipped behavior must be represented in stories and tests.

## Consequences

Figma may differ during exploration. Code wins for what shipped. When prototyping any named view, Storybook is also the required live companion for visual HITL; chat JSX is not a substitute gallery.
