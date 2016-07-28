/**
 * Created by amu35 on 24/07/2016.
 */
var express = require('express');
var manager = express.Router();

manager.use('/cases',require('./CasesAPIController'));
manager.use('/users',require('./UsersAPIController'));
manager.use('/warehouse',require('./WarehouseAPIController'));
manager.use('/techAssistant', require('./helpchat/TechAssistantAPIController.js'));
manager.use('/helpchat', require('./helpchat/CustomerHelpchatAPIController.js'));

module.exports = manager;
