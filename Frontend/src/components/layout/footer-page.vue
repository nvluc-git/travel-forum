<template>
  <div class="footer-page pt-5 pb-5" style="color: #b2b2b2">
    <div class="container ps-0 pe-0">
      <!-- item 1 -->
      <div class="d-flex justify-content-between align-item-start gap-5">
        <div class="col lh-base">
          <div class="title-footer">VIVU</div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            accusantium. Explicabo quasi, nam officia beatae ducimus praesentium
            molestias optio voluptate dolorem enim soluta? Maxime dignissimos
            neque esse ex delectus aut!
          </div>
        </div>

        <div class="col lh-base">
          <div class="title-footer">Policy & Terms</div>
          <div>
            <div>About privacy policy</div>
            <div>About terms</div>
          </div>
        </div>

        <div class="col lh-base">
          <div class="title-footer">RESOURCES</div>
          <div>
            <div>
              <!-- <router-link to="/user/discovery" class="navLink"
                >Discovery</router-link
              > -->
            </div>
            <div>
              <!-- <router-link to="/user/discussion" class="navLink"
                >Discussion</router-link
              > -->
            </div>
          </div>
        </div>
        <div class="col lh-base">
          <div class="title-footer">Contacts</div>
          <div
            class="d-flex flex-column justify-content-between align-item-start my-text"
          >
            <div>Email: nv.luc1912@gmail.com</div>
            <div>Phone: 035-218-5650</div>
            <div>Address: 2 P. Phạm Văn Bạch, Dịch Vọng, Cầu Giấy, Hà Nội</div>
          </div>
        </div>
      </div>
      <!-- item 2 -->
      <div class="break-line"></div>
      <!-- item 3 -->
      <div class="d-flex justify-content-between align-item-center">
        <div class="fst-italic">Copyright © 2023 Nguyen Van Luc</div>

        <div class="d-flex justify-content-between align-item-center">
          <a
            href="https://translate.google.com/"
            target="blank"
            class="social-icon"
          >
            <i class="fab fa-facebook"></i
          ></a>
          <a
            href="https://www.google.com/"
            target="blank"
            class="social-icon ms-4 me-4"
            ><i class="fab fa-instagram"></i
          ></a>
          <a href="https://www.google.com/" target="blank" class="social-icon">
            <i class="fab fa-github"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer-page",
};
</script>

<style scoped>
.footer-page {
  background-color: #20262e;
}
.title-footer {
  font-size: 1.8em;
  text-transform: uppercase;
  font-weight: bold;
  color: white;
}

.navLink {
  text-decoration: none;
  color: #b2b2b2;
}
.navLink:hover {
  color: white;
}
.break-line {
  background-color: white;
  height: 1px;
  width: 100%;
  border-radius: 10px;
  opacity: 0.5;
  margin: 20px 0;
}
.cotdoc {
  height: 30px;
  width: 1px;
  background-color: #b2b2b2;
}
.social-icon {
  font-size: 1.5em;
  color: #b2b2b2;
  transition: color 0.5s;
}
.social-icon:hover {
  color: white;
}
.aaaa {
  text-decoration: none;
  color: #b2b2b2;
}
</style>
