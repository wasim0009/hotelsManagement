const jsonString= `{
    "date":"15 March 2024",
    "temperature": "20 degree",
    "condition":"Hot",
    "humidity":"44%"
}`
// const jsonString = '{"name": "John", "age": 30}';
const jsonObject = JSON.parse(jsonString);
console.log(jsonObject.date); // Output: John
console.log(jsonObject.temperature); // Output: 30
console.log(jsonObject.condition); // Output: 30
console.log(jsonObject.humidity); // Output: 30
