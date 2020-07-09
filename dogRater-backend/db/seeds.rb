# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all
Post.destroy_all
Comment.destroy_all

zoe = User.create(name: "Zoe", email: "zoe@email.com")
sid = User.create(name: "Sid", email: "sid@email.com")

post1 = Post.create(img_url:"https://preferredpetpartners.com/wp-content/uploads/2020/05/puppy.jpg", caption: "11/10 good pupper", user_id: zoe.id)
post2 = Post.create(img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR26CdfdB_jb9jyX62hIct5A09TxNzpCmMK6A&usqp=CAU", caption: "13/10 very good doggo", user_id: sid.id)

comment1 = Comment.create(caption: "awhhhhhh!", user_id: zoe.id, post_id: post2.id )
comment2 = Comment.create(caption: "I want one", user_id: sid.id, post_id: post1.id)
comment3 = Comment.create(caption: "Too adorbz omg", user_id: zoe.id, post_id: post2.id)

