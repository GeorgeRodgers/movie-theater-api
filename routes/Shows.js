const { Router } = require(`express`);
const { User, Show } = require(`../models/index`);
const { check, validationResult } = require(`express-validator`);