const productsSchema = require('../models/product');

const getAllProductsStatic = async(req,res) => {

    //Searching displaying for items prices are greater than 30
   const products = await productsSchema.find({ price: {$gt: 30} }).sort('price').select('name price')

    //Searching displaying for a single item named vase table
   //const products = await productsSchema.find({ name:'vase table'});

   //Searching displaying for certain properties/fields from the database
   //const products = await productsSchema.find({}).select('name price');

   //Searching displaying for certain properties and limiting the number items given/displayed
   //const products = await productsSchema.find({}).sort('name').select('name price').limit(10);

   //using limit() and skip().skip() jumps a specific item/row in the database
   //skip(1) jumps the first item/row in the database,skip(2) skips the first 2
   //const products = await productsSchema.find({})
   //.sort('name').select('name price').limit(10).skip(1);

    //Searching and displaying all items and sorting them using the name in alphabet order
    //const products = await productsSchema.find({}).sort('name');

    //Searching and displaying all items and sorting them using the name in reverse alphabet order
    //const products = await productsSchema.find({}).sort('-name');

    //Searching and displaying all items and sorting them using price from smallest to highest
    //const products = await productsSchema.find({}).sort('price');

    //Searching and displaying all items and sorting them using price from highest to smallest
    //const products = await productsSchema.find({}).sort('-price');

    //Searching and displaying all items and sorting them using the name and price in order
    //const products = await productsSchema.find({}).sort('name price');

     //Searching and displaying all items and sorting them using the name and price in reverse order
     //const products = await productsSchema.find({}).sort('-name -price');

     //Searching and displaying all items and sorting them using the name and price
     //const products = await productsSchema.find({}).sort('-name price');

      //Searching and displaying all items and sorting them using the name and price
     //const products = await productsSchema.find({}).sort('name -price');

   res.status(200).json({ products, nbHits: products.length });
   //res.status(200).json({ msg:'Products Testing Route'});
}

const getAllProducts = async(req,res) => {
    //console.log(req.query); //req.query contains the param values send by the user,can be 
    //all(empty-general) or specific request of items. All => productsSchema.find({}); 
    //specific => productsSchema.find({ name:'vase table'}),productsSchema.find({ id=1});
    const { featured, company, name, sort, fields, numericFilters} = req.query;
    const queryObject = {}
     //making new query object,helps remove error of items not in db -continue process regardless
     //of the error.--fields is used to only select specific properties from the database.-- 
     //queryObject will only hold params/items that are defined in the db,hence what comes from
     //the user (req.query) is checked(line 13) by getting the existing params and avoiding the non
     //defined params that a user may send in.Then the defined ones are used to query the db.

    if(featured){
        queryObject.featured = featured === 'true'?true:false;
        //if featured is inside the param set it as part of the queryObject property
        //that will be used to find data in the database
    }
    if(company){
      queryObject.company = company; //=company is the company in const {featured,company}
    }
    if(name){
        queryObject.name = { $regex: name, $options: 'i'};
        //i meaning case insentive all lower and upper cases words will be gotten
    }
    //Filtering data using numeric values of price and rating
    if(numericFilters){
        //console.log(numericFilters);
        //mapping common operators to mongoose operators,so operators can work in mongoose db
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
        //replacing the common operators with the mongoose operators
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,(match) => `-${operatorMap[match]}-`);
        console.log(filters);
        //(match) argument is the operator to be matched

        //filter using numbers only on price and ranting fields
        const options = ['price','rating'];
        filters = filters.split(',').forEach((item) => {
            const [field,operator,value] = item.split('-');
            if(options.includes(field)){
                queryObject[field] = { [operator]: Number(value) } 
            }
        })
    }

    console.log(queryObject);
    // Sorting the data
    let result = productsSchema.find(queryObject);
    if(sort){
        //console.log('Sort is  working');
        const sortList = sort.split(',').join(' ');
        //the url separates the sorting properties using a comma -- name,price
        //hence split then join by space in order to replace the the comma with space
        //that is accepted and used to query in the db
        result = result.sort(sortList); //sorting the data using the sorting params given
    }
    else{
        //if no sorting params are set,use the date and time of items when they were entered in db
        result = result.sort('createAt'); 
    }
    
    //Check for and select wanted specific fields or properties from the db if user requested this
    if(fields){
      const fieldsList = fields.split(',').join(' ');
      result = result.select(fieldsList);
    }
    
    //checking and implementing pagination using limit and skip.Check if user requested these
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1) * limit

    result = result.skip(skip).limit(limit);
    //skip and limit in the arguments are the variables defined above,then passed as arguments

    const products = await result
    res.status(200).json({ products, nbHits: products.length });

    //Simple approach when sorting is not being used
    //const products = await productsSchema.find(queryObject);
    //res.status(200).json({ products, nbHits: products.length });

    //Below simple approach code to the above code functionality
    //const products = await productsSchema.find(req.query);
    //res.status(200).json({ products, nbHits: products.length });
    //res.status(200).json({ msg:'Products Route'});
}
 
module.exports = { getAllProductsStatic, getAllProducts }

