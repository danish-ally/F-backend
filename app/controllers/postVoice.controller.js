const db = require("../models");
const PostVoice = db.postVoice;
const { sequelize } = require("../models");

exports.create = (req, res) => {
  // Validate request
  const postId = req.body.postId;
  const userId = req.body.userId;
  const voice = req.body.voice;
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
      "postVoices"
      where
      "postVoices"."postId" = '${postId}'
      and "postVoices"."userId" = '${userId}')>0)
      
      then 
      
      
      UPDATE "postVoices" set "voice" = '${voice}'
      WHERE "postVoices"."postId" = '${postId}'
      and "postVoices"."userId" = '${userId}';
    
    else
    
      
        INSERT INTO "postVoices"
        (id, "postId", "userId","voice" ,"isActive", "createdAt", "updatedAt")
        VALUES(uuid_generate_v1(),'${postId}', '${userId}','${voice}' true, now(),now());
      
      
    end if;
    
  end
  $$
  `)
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

};

exports.findAll = (req, res) => {
  const { postId } = req.params;
  console.log(req.params)

  PostVoice.findAll({
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