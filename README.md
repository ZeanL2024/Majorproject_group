# Major-project_indivisual
# Project Title: Dynamic Artwork Display

## Interaction Guide

This project, created with p5.js, showcases a dynamic piece of art that simulates old film effects and features a dynamically animated boat and dove. Here is how you can interact with the artwork:

- **Page Load**: Upon loading the page, the background animation will automatically start.
- **Mouse Click**: Click anywhere on the screen to restart the dove animation.
- **Window Resize**: Adjusting the browser window size will redraw the screen to ensure the animation fits the new dimensions.

## Animation Implementation

In this project, I was responsible for the following animations:

- **Old Film Effects**: Added random "noise" and slight jitter to the scene, mimicking the visual effect of an old projector.
- **Dove Animation**: I specifically worked on animating the dove, ensuring it appears as if it is gracefully flying across the screen.

### Animation Drivers

- **Time-Based**: Utilizing p5.js's `frameCount` to control the animation's playback, ensuring smooth progression.

### Animated Properties

- **Background**: The mountainous backdrop is generated using Perlin Noise, changing slightly with each page refresh to mimic the unpredictability of nature.
- **Dove**: The dove's flight is controlled through time-based functions that adjust its position and the flapping of its wings, giving a lifelike animation.

## Technical Description

- **Perlin Noise**: A widely used algorithm for generating natural-looking patterns, supported natively by p5.js.
- **Old Film Effect**: Achieved by drawing random white dots across the screen and occasional full-screen white flashes to add visual "noise".

### Code Comments

The project code includes detailed comments explaining the purpose and workings of each function and significant code block. Specific techniques and tools brought into the project include:

- **Perlin Noise**: Employed for generating the dynamic wave background (referenced from p5.js official documentation).
- **Dove Animation**: Developed to enhance the interactivity and visual appeal of the art piece, mimicking the natural movement of a dove in flight.

### External Resources Reference

- **Old Film Effect Implementation Inspiration**: Derived from various digital art tutorials, particularly a series of p5.js tutorials available on YouTube.
**OpenProcessing Example** - Provides a technical example of animation implementation, reference link at [OpenProcessing Sketch](https://openprocessing.org/sketch/743533).
![teche image](image/oldfilm.png)

