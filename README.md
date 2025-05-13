# 7 GUIs utilizing Elysia with Bun runtime

The tasks were selected by the following criteria. 

The task set should be as small as possible yet reflect as many typical (or fundamental or representative) challenges in GUI programming as possible. 

Each task should be as simple and self-contained as possible yet not too artificial. 

### Counter
- The task is to build a frame containing a label or read-only textfield T and a button B. Initially, the value in T is “0” and each click of B increases the value in T by one.

### Temperature Converter
- The task is to build a frame containing two textfields TC and TF representing the temperature in Celsius and Fahrenheit, respectively. Initially, both TC and TF are empty. When the user enters a numerical value into TC the corresponding value in TF is automatically updated and vice versa. When the user enters a non-numerical string into TC the value in TF is not updated and vice versa.
- The formula for converting a temperature C in Celsius into a temperature F in Fahrenheit is C = (F - 32) * (5/9) and the dual direction is F = C * (9/5) + 32.

### Flight Booker
- The task is to build a frame containing a combobox C with the two options “one-way flight” and “return flight”, two textfields T1 and T2 representing the start and return date, respectively, and a button B for submitting the selected flight. T2 is enabled iff C’s value is “return flight”. When C has the value “return flight” and T2’s date is strictly before T1’s then B is disabled. When a non-disabled textfield T has an ill-formatted date then T is colored red and B is disabled. When clicking B a message is displayed informing the user of his selection (e.g. “You have booked a one-way flight on 04.04.2014.”). Initially, C has the value “one-way flight” and T1 as well as T2 have the same (arbitrary) date (it is implied that T2 is disabled).

### Timer
- The task is to build a frame containing a gauge G for the elapsed time e, a label which shows the elapsed time as a numerical value, a slider S by which the duration d of the timer can be adjusted while the timer is running and a reset button R. Adjusting S must immediately reflect on d and not only when S is released. It follows that while moving S the filled amount of G will (usually) change immediately. When e ≥ d is true then the timer stops (and G will be full). If, thereafter, d is increased such that d > e will be true then the timer restarts to tick until e ≥ d is true again. Clicking R will reset e to zero.

### CRUD

### Circle Drawer

### Cells


## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.
