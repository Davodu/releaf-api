import mongoose from 'mongoose'; 
import { Router } from 'express'; 
import Company from '../model/company';

import { authenticate } from '../middleware/authmiddleware'; //adds authentication to http requests
export default ({config, db}) =>{
	let api = Router();



	// '/v1/releaf/admin/add'  CREATE (ADD)
	api.post('/admin/add',authenticate, (req, res) => {
		let newData = new Company();
		newData.id = req.body.id;
		newData.name = req.body.name;
		newData.num_employees =req.body.num_employees,
		newData.contact_email = req.body.contact_email,
		newData.year_founded = req.body.year_founded,
		newData.contact_name = req.body.contact_name,
			newData.rankings.financials = req.body.rankings.financials,
			newData.rankings.team = req.body.rankings.team,
			newData.rankings.idea = req.body.rankings.idea

		newData.save(err=>{
			if(err){
				res.send(err);
			}
			res.json({message: "Congrats,new company added"});
		})
	})

	//  '/v1/releaf/admin/all   READ(GET all companies)
	api.get('/admin/all',authenticate,(req, res) => {
		Company.find({}, (err, companies)=>{
			if(err){
				res.send(err);
			}
			res.json(companies);
		})
	})

	//  '/v1/releaf/admin/delete/:id'    DELETE 
	api.delete('/admin/delete/:id',authenticate, (req, res) => {
		Company.remove({_id: req.params.id}, (err, company)=>{
			if(err){
				res.send(err);
			}
			res.json({message: `Company successfully removed from database`})
		})
	})

	//  '/v1/releaf/admin/update/:id'          UPDATE(PUT method)
	api.put('/admin/update/:id', authenticate, (req, res) =>{
		Company.findById(req.params.id, (err, company)=> {
			if(err){
				res.send(err);
			}
			// Update each attribute with any possible attribute that may have been submitted in the 
			//body of the request or default back to whatever it was before.
	    company.id = req.body.id ||company.id;
		company.name = req.body.name || company.name ;
		company.num_employees =req.body.num_employees || company.num_employees;
		company.contact_email = req.body.contact_email || company.contact_email;
		company.year_founded = req.body.year_founded || company.year_founded;
		company.contact_name = req.body.contact_name || company.contact_name;
			if(req.body.rankings){
			company.rankings.financials = req.body.rankings.financials || company.rankings.financials;
			company.rankings.team = req.body.rankings.team || company.rankings.team;
			company.rankings.idea = req.body.rankings.idea || company.rankings.idea;
		}

			//save updated company info bacl to db
			company.save((err)=>{
				if(err){
					res.send(err);
				}
				res.json({message:`Company info for ${company.name} updated`});
			})

		})
	})

	//  '/v1/releaf/info/:id' READ(SPECIFIC BASED ON ID)
	api.get('/info/:id', (req, res) => {
		Company.findById(req.params.id,(err, company)=> {
			if(err){
				res.send(err);
			}
			res.json(company); 
		})
	})

	//    /v1/releaf/:category/:topk    get top k from category
	api.get('/:category/:topk', (req, res) => {
		var final = []
		var categ = req.params.category; //unused
		Company.aggregate([
		// Grouping pipeline can be improved to contain all objects
        { "$group": { 
        	"_id": {
        		'name': `$name`,
        		'ranking': `$rankings.${req.params.category}`
        	} ,
            "companyCount": { "$sum": 1 }
        }},
		// Sorting pipeline
        { "$sort": { "_id.ranking": -1 } },
        // limit results to topk
        { "$limit": parseInt(req.params.topk)}
			], (err, result)=>{
			if(err){
				res.send(err);
			}
			result.forEach((entry)=> {
				final.push({
					name: entry._id.name,
					ranking: entry._id.ranking,
				})
			})
			res.json(final);
		});
	})
	return api;
}


































