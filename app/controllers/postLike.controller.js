const db = require("../models");
const PostLike = db.postLike;
const Op = db.Sequelize.Op;
const { pool } = require('../config/db.config');
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
      "postLikes"
      where
      "postLikes"."postId" = '${postId}'
      and "postLikes"."userId" = '${userId}')>0)
      
      then 
      
      
      UPDATE "postLikes" SET "isActive" = not "postLikes"."isActive" 
      WHERE "postLikes"."postId" = '${postId}'
      and "postLikes"."userId" = '${userId}';
    
    else
    
      
        INSERT INTO "postLikes"
        (id, "postId", "userId", "isActive", "createdAt", "updatedAt")
        VALUES(uuid_generate_v1(),'${postId}', '${userId}', true, now(),now());
      
      
    end if;
    
  end
  $$
  `)
    .then(function (properties) {
      sequelize.query(`
        select
        count(*) 
      from
      "postLikes"
      where
      "postLikes"."postId" = '${postId}'
      and "postLikes"."userId" = '${userId}'
      and "postLikes"."isActive" = true`)
        .then(function (val) {

          res.status(200).send(val[0])
        }).catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials."
          });
        });

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

  PostLike.findAll({
    where: { postId: postId, isActive: true },
    attributes: ['id', "isActive"],
    include: {
      model: db.user,
      as: 'users',
      attributes: ['userId', 'firstName', 'lastName'],
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