const db = require("../models");
const PostComment = db.postComment;
const { sequelize } = require("../models");

exports.create = (req, res) => {
  // Validate request
  const postId = req.body.postId;
  const userId = req.body.userId;
  const comment = req.body.comment;
  if (!(postId && userId)) {
    res.status(400).send({
      message: "Invalid Request"
    });
    return;
  }
   const postComment ={
     postId:postId,
     userId:userId,
     comment:comment
   }

  PostComment.create(postComment)
  .then(function (properties) {
    res.status(200).send({
        message:"COmmented Successfully!"
    })
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });

  // sequelize.query(`do $$
  // begin
  
  // if
  //   ((select
  //       count(*)
  //     from
  //     "postComments"
  //     where
  //     "postComments"."postId" = '${postId}'
  //     and "postComments"."userId" = '${userId}')>0)
      
  //     then 
      
      
  //     UPDATE "postComments" SET "comment" = '${comment}'
  //     WHERE "postComments"."postId" = '${postId}'
  //     and "postComments"."userId" = '${userId}';
    
  //   else
    
      
  //       INSERT INTO "postComments"
  //       (id, "postId", "userId","comment", "isActive", "createdAt", "updatedAt")
  //       VALUES(uuid_generate_v1(),'${postId}', '${userId}','${comment}', true, now(),now());
      
      
  //   end if;
    
  // end
  // $$
  // `)
  //     .then(function (properties) {
  //       res.status(200).send({
  //           message:"COmmented Successfully!"
  //       })
  //     }).catch(err => {
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while retrieving tutorials."
  //       });
  //     });

};

exports.findAll = (req, res) => {
  const { postId } = req.params;
  console.log(req.params)

  PostComment.findAll({
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