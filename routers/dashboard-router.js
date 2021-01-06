let query = require('../models/authenticate.js');
var express = require('express');
var dashboard_router = express.Router({mergeParams:true});
let Misc=require('../helper_functions/Miscallaneous.js')

dashboard_router.get('/table',async (req,res)=>
{
    users = await query.all_users();
    res.send(users)
});

dashboard_router.delete('/table/delete',async (req,res)=>
{
    let email = req.body.email;
    await query.delete_recent_user(email);
    res.send({email:email})
});

dashboard_router.get('/active_users',async (req,res)=>
{
    active_users = await query.active_users();
    let new_active_users = Misc.returnLastLogin(active_users)
    res.send(new_active_users)
});

module.exports = dashboard_router;