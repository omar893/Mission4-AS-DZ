import { faker } from '@faker-js/faker';

export const generateRandomCar = () => {
    return {
        brand: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        year: faker.number.int({min: 1980, max: 2023}),
        color: faker.color.human(),
        type: faker.vehicle.type(),
        imageURL: faker.image.url()
    }
}

export const CARS = faker.helpers.multiple(generateRandomCar, {
    count: 100
});