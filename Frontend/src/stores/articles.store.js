import { defineStore } from "pinia";
import { ref, computed } from "vue";
import articlesApi from "@/services/articleAPI";
import { accountsStore } from "./accounts.store";
import router from "@/routers";
const useAccount = accountsStore();
useAccount.getAccounts();
export const articlesStore = defineStore("articles", () => {
  // states
  const articles = ref({ articles: [], count: 0 });
  const article = ref({});
  const searchAll = ref("");
  const selected = ref("All");
  const options = ref([
    { text: "All", value: "All" },
    { text: "Cuisine", value: "Cuisine" },
    { text: "Culture", value: "Culture" },
    { text: "Experience", value: "Experience" },
    { text: "Activity", value: "Activity" },
    { text: "Other", value: "Other" },
  ]);
  const mess = ref("");
  const likeArr = ref([]);
  const bookMark = ref([]);

  const articleByUser = ref([]);
  const currentValue = ref({
    articleId: "",
    title: "",
    subTitle: "",
    content: "",
    typeId: "",
    categoryId: "",
    image: "",
  });

  const articlePost = ref([]);
  const articleQuestion = ref([]);
  const articlePostUser = ref([]);
  const articleQuestionUser = ref([]);

  const searching = computed(() => {
    let forSearch = articles.value.filter((s) =>
      s.title.toLowerCase().includes(searchAll.value.toLowerCase())
    );
    return forSearch;
  });

  const isShowLike = computed(() => {
    const isLike = likeArr.value;
    const accountId = isLike.map((item) => item.accountId);
    if (accountId.includes(useAccount.currentUser.id) === true)
      return "pi pi-heart-fill";
    else {
      return "pi pi-heart";
    }
  });

  const isShowBm = computed(() => {
    const isBookmark = bookMark.value;
    const account_id = isBookmark.map((item) => item.accountId);
    if (account_id.includes(useAccount.currentUser.id) === true)
      return "pi pi-bookmark-fill";
    else {
      return "pi pi-bookmark";
    }
  });

  const onGetAll = async () => {
    try {
      const res = await articlesApi.getAll();
      const { data } = res.data;
      articles.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  const onGetOne = async (id) => {
    try {
      const res = await articlesApi.getById(id);
      const { data } = res.data;
      if (data === false) return router.push({ name: "error" });
      article.value = data;
      likeArr.value = data.Likes;
      bookMark.value = data.Bookmarks;
      //
      currentValue.value.articleId = data.id;
      currentValue.value.title = data.title;
      currentValue.value.subTitle = data.subTitle;
      currentValue.value.content = data.content;
      currentValue.value.typeId = data.typeData.id;
      currentValue.value.categoryId = data.categoryData.id;
      currentValue.value.image = data.image;
    } catch (error) {
      console.log(error);
    }
  };
  const posts_popular = ref([]);
  const getArticlePost = async () => {
    try {
      const res = await articlesApi.getByPost();
      const { data } = res.data;
      articlePost.value = data;
      let popular = articlePost.value;
      let filterPopular = popular.filter((values) => values.Likes.length > 0);
      let sortPopular = filterPopular.sort((a, b) => {
        return b.Likes.length - a.Likes.length;
      });
      let get_popular = sortPopular.slice(0, 4);
      posts_popular.value = get_popular;
    } catch (error) {
      console.log(error);
    }
  };
  const questions_popular = ref([]);
  const getArticleQuestion = async () => {
    try {
      const res = await articlesApi.getByQuestion();
      const { data } = res.data;
      articleQuestion.value = data;
      let popular = articleQuestion.value;
      let filterPopular = popular.filter((values) => values.Likes.length > 0);
      let sortPopular = filterPopular.sort((a, b) => {
        return b.Likes.length - a.Likes.length;
      });
      let get_popular = sortPopular.slice(0, 4);
      questions_popular.value = get_popular;
    } catch (error) {
      console.log(error);
    }
  };
  //
  const onGetPostUser = async () => {
    try {
      const res = await articlesApi.getPostUser();
      const { data } = res.data;
      articlePostUser.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  const onGetQuestionUser = async () => {
    try {
      const res = await articlesApi.getQuestionUser();
      const { data } = res.data;
      articleQuestionUser.value = data;
    } catch (error) {
      console.log(error);
    }
  };
  //
  const onNewData = async (values) => {
    try {
      const res = await articlesApi.newArticle(values);
      const { message } = res.data;
      mess.value = message;
    } catch (error) {
      console.log(error);
    }
  };
  const updateData = async (values) => {
    try {
      const res = await articlesApi.updateArticle(values);
      const { message } = res.data;
      mess.value = message;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteData = async (id) => {
    try {
      const res = await articlesApi.deleteArticle(id);
      const { message } = res.data;
      mess.value = message;
    } catch (error) {
      console.log(error);
    }
  };

  const search_PostUser = ref("");
  const searchPostUser = computed(() => {
    let forSearch = articlePostUser.value.filter((s) =>
      s.title.toLowerCase().includes(search_PostUser.value.toLowerCase())
    );
    if (selected.value === "Culture") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    if (selected.value === "Cuisine") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    if (selected.value === "Experience") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    if (selected.value === "Activity") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    if (selected.value === "Other") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    return forSearch;
  });

  const search_QuestionUser = ref("");
  const searchQuestionUser = computed(() => {
    let forSearch = articleQuestionUser.value.filter((s) =>
      s.title.toLowerCase().includes(search_QuestionUser.value.toLowerCase())
    );
    if (selected.value === "Culture") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    if (selected.value === "Cuisine") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    if (selected.value === "Experience") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    if (selected.value === "Activity") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    if (selected.value === "Other") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    return forSearch;
  });

  const search_posts = ref("");
  const filterPosts = computed(() => {
    let forSearch = articlePost.value.filter((s) =>
      s.title.toLowerCase().includes(search_posts.value.toLowerCase())
    );
    if (selected.value === "Culture") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    if (selected.value === "Cuisine") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    if (selected.value === "Experience") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    if (selected.value === "Activity") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    if (selected.value === "Other") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    return forSearch;
  });

  const search_questions = ref("");
  const filterQuestions = computed(() => {
    let forSearch = articleQuestion.value.filter((s) =>
      s.title.toLowerCase().includes(search_questions.value.toLowerCase())
    );
    if (selected.value === "Culture") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    if (selected.value === "Cuisine") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    if (selected.value === "Experience") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    if (selected.value === "Activity") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    if (selected.value === "Other") {
      return forSearch.filter((c) => c.category === selected.value);
    }
    return forSearch;
  });

  const articleUser = async (id, userId) => {
    try {
      const artUser = await articlesApi.getByUser(userId);
      const { data } = artUser.data;
      let myData = data;
      let dataRandom = myData.sort(() => 0.5 - Math.random());
      let article_user = dataRandom.filter((values) => values.type === "Post");
      let post_user = article_user.filter((values) => values.id !== Number(id));
      let get_post_user = post_user.slice(0, 4);
      articleByUser.value = get_post_user;
    } catch (error) {
      console.log(error);
    }
  };
  const relatedArticle = ref([]);
  const articleRelated = async (cate, articleId) => {
    try {
      const res = await articlesApi.getByPost();
      const { data } = res.data;
      let myData = data;

      let dataRandom = myData.sort(() => 0.5 - Math.random());
      let article_related = dataRandom.filter(
        (values) => values.category === cate
      );
      let removeCurrent = article_related.filter(
        (values) => values.id !== Number(articleId)
      );
      let get_article_related = removeCurrent.slice(0, 4);
      relatedArticle.value = get_article_related;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    articles,
    article,
    searchAll,
    selected,
    options,
    onGetAll,
    onGetOne,
    onNewData,
    searching,
    mess,
    likeArr,
    isShowLike,
    articleByUser,
    currentValue,
    articlePost,
    articleQuestion,
    articlePostUser,
    articleQuestionUser,
    onGetPostUser,
    onGetQuestionUser,
    getArticlePost,
    getArticleQuestion,
    updateData,
    deleteData,
    searchPostUser,
    search_PostUser,
    searchQuestionUser,
    search_QuestionUser,
    filterPosts,
    search_posts,
    filterQuestions,
    search_questions,
    articleUser,
    articleRelated,
    relatedArticle,
    bookMark,
    isShowBm,
    posts_popular,
    questions_popular,
  };
});
