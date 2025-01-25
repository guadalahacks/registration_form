const { PrismaClient } = require('@prisma/client');
const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Middleware to validate request body
const validateRegistration = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
    body('email').isEmail().withMessage('Email must be a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('phoneNumber').notEmpty().withMessage('Phone number is required'),
    body('countryOfResidence').notEmpty().withMessage('Country of residence is required'),
    body('school').notEmpty().withMessage('School is required'),
    body('major').notEmpty().withMessage('Major is required'),
    body('classification').notEmpty().withMessage('Classification is required'),
    body('anticipatedGraduationYear').isInt({ min: 2023 }).withMessage('Anticipated graduation year must be a valid year'),
    body('currentLevelOfStudy').notEmpty().withMessage('Current level of study is required'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('hackathonsAttended').isInt({ min: 0 }).withMessage('Hackathons attended must be a non-negative integer'),
    body('technicalSkills').isArray().withMessage('Technical skills must be an array'),
    body('dietaryRestrictions').isArray().withMessage('Dietary restrictions must be an array'),
    body('hasTeam').isBoolean().withMessage('Has team must be a boolean'),
    body('heardAboutGuadalahacks').notEmpty().withMessage('Heard about Guadalahacks is required'),
    body('shirtSize').notEmpty().withMessage('Shirt size is required'),
    body('resume').notEmpty().withMessage('Resume is required'),
    body('emergencyContactName').notEmpty().withMessage('Emergency contact name is required'),
    body('emergencyContactRelationship').notEmpty().withMessage('Emergency contact relationship is required'),
    body('emergencyContactPhoneNumber').notEmpty().withMessage('Emergency contact phone number is required'),
    body('emergencyContactEmail').isEmail().withMessage('Emergency contact email must be a valid email'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Create a new registration form entry
app.post('/registration', validateRegistration, async (req, res, next) => {
    const data = req.body;
    try {
        const newRegistration = await prisma.registrationForm.create({
            data: data,
        });
        res.status(201).json(newRegistration);
    } catch (error) {
        next(error);
    }
});

// Read all registration form entries
app.get('/registrations', async (req, res, next) => {
    try {
        const registrations = await prisma.registrationForm.findMany();
        res.status(200).json(registrations);
    } catch (error) {
        next(error);
    }
});

// Read a single registration form entry by ID
app.get('/registration/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const registration = await prisma.registrationForm.findUnique({
            where: { id: parseInt(id) },
        });
        if (registration) {
            res.status(200).json(registration);
        } else {
            res.status(404).json({ error: 'Registration not found' });
        }
    } catch (error) {
        next(error);
    }
});

// Update a registration form entry by ID
app.put('/registration/:id', validateRegistration, async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedRegistration = await prisma.registrationForm.update({
            where: { id: parseInt(id) },
            data: data,
        });
        res.status(200).json(updatedRegistration);
    } catch (error) {
        next(error);
    }
});

// Delete a registration form entry by ID
app.delete('/registration/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        await prisma.registrationForm.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});