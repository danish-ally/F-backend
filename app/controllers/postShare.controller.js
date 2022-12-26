const db = require("../models");
const PostShare = db.postShare;
const { sequelize } = require("../models");

exports.create = (req, res) => {
  // Validate request
  const postId = req.body.postId;
  const userId = req.body.userId;
  if (!(postId && userId)) {
    res.status(400).send({
      message: "Invalid Request"
    });
    return;
  }

  sequelize.query(`do $$
  begin
  
  if
    ((select
        count(*)
      from
      "postShares"
      where
      "postShares"."postId" = '${postId}'
      and "postShares"."userId" = '${userId}')>0)
      
      then 
      
      
      UPDATE "postShares" SET "isActive" = true
      WHERE "postShares"."postId" = '${postId}'
      and "postShares"."userId" = '${userId}';
    
    else
    
      
        INSERT INTO "postShares"
        (id, "postId", "userId", "isActive", "createdAt", "updatedAt")
        VALUES(uuid_generate_v1(),'${postId}', '${userId}', true, now(),now());
      
      
    end if;
    
  end
  $$
  `)
      .then(function (properties) {
        res.status(200).send({
            message:"Shared Successfully!"
        })
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });

};

exports.findAll = (req, res) => {
  const { postId } = req.params;
  console.log(req.params)

  PostShare.findAll({
    where: { postId: postId,isActive:true },
    attributes: ["id","isActive","comment"],
    include: {
      model: db.user,
      as: 'users',
      attributes: ['userId','firstName', 'lastName'],
    },
  })
    .then(data => {
      console.log(data)
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};