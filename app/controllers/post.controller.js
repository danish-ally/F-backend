
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");
const Sequelize = require("sequelize");

const db = require("../models");
const Post = db.post;
const PostLike = db.postLike;
const PostImage = db.postImage;
const Op = db.Sequelize.q;

exports.create = async (req, res) => {
  // Validate request
  console.log("first")
  let description = req.body.description;
  let userId = req.body.userId;
  // const location = req.body.location;
  // const images = req.body.images;
  // const groupTags = req.body.groupTags;
  // const friendTags = req.body.friendTags;
  if (!req.body.description) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  console.log("2")

  let post = {
    description: description,
    userId: userId,
    // location: location ? location : null,
  };
  // Save User in the database
  // let postUuid = "" ;
  Post.create(post)
    .then(data => {
      // postUuid = data.id;
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });

  // for (var key in images) {
  //   if (images.hasOwnProperty(key)) {
  //     const postImage = {
  //       postId: postUuid,
  //       image:images.hasOwnProperty(key)
  //     }
  //     console.log(postImage)
  //     PostImage.create(postImage)
  //       .catch(err => {
  //         res.status(500).send({
  //           message:
  //             err.message || "Some error occurred while creating the User."
  //         });
  //       });

  //     //do something with e.g. req.body[key]
  //   }
  // }
  // images.forEach((image) =>{
  //   const postImage = {
  //     postId :postId,
  //     image :image
  //   }
  //   PostImage.create(postImage)
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the User."
  //     });
  //   });
  // })
  // res.end('ok')
};

const getFormattedData = async (data) => {
  let ress = []
  data.forEach(async (element) => {

    var likes1 = 0;
    await PostLike.findAll({
      where: { postId: element.id },
      
    })
      .then(async function async(like) {
        console.log(like.length);
        likes1 = like.length;
        let object = {
          id: element.id,
          description: element.description,
          user: {
            id: element.userId,
            firstName: element.firstName,
            lastName: element.lastName,
            image: null
          },
          likes: likes1
        };
        console.log(object);
        ress.push(object)
      })
  })
  return ress;

}

exports.findAll = (req, res) => {
  const { userId } = req.params;

  sequelize.query(`select
  "posts"."id" as "id" ,
  "users"."userId"  as "userId",
  "users"."firstName" as "firstName",
  "users"."lastName" as "lastName",
  "posts"."description" as "description",
  count("postLikes"."id") as "likes",
  count("postComments"."id") as comments,
  count("postShares"."id") as shares,
  count("postVoices"."id") as voices,
  "posts"."createdAt" as createdAt

from
  "posts"
inner join "users" on
  "users"."userId" = "posts"."userId"
left join "postLikes" on
  "postLikes"."postId" = "posts"."id"
  and 
  "postLikes"."isActive" = true 
left join "postComments" on
  "postComments"."postId" = "posts"."id"
  and 
  "postComments"."isActive" = true 
left join "postShares" on
  "postShares"."postId" = "posts"."id"
  and 
  "postComments"."isActive" = true 
left join "postVoices" on
  "postVoices"."postId" = "posts"."id"
  and 
  "postVoices"."isActive" = true 

where
  "users"."userId" = '${userId}' 
group by  
"posts"."id",
"users"."userId" ,
"users"."firstName",
"users"."lastName",
"posts"."description"
order by "posts"."createdAt" desc`,
    { type: Sequelize.QueryTypes.SELECT })
    .then(function (properties) {
      res.send(properties)
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}
