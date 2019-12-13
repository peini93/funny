<section class="main-section">

	<div class="left">

	<div class="single-head">
	<?php if(0){ ?>
		<div class="card sinlgeBoxcontent" fid="<?=$d['fid']?>">
			<div class="content-box"> 
				<div class="content-box-top">
																 
					<div class="member">
						<a href="member-<?=$d['f_uid']."-".$d['f_author_name']?>" class="img"><img src="<?=cover($d['f_uid'])?>" alt="<?=cover($d['f_author_name'])?>"></a>
						<div class="memberInfo"><a href="member-<?=$d['f_uid']."-".$d['f_author_name']?>" class="name"><?=$d['f_author_name']?></a><span class="lv">Lv.<?=$d['f_user_info']['u_lv']?></span><span class="exp">經驗值 <?=$d['f_user_info']['u_exp']?></span><span class="douCoin"><a href="/market">鬥幣 <?=$d['f_user_info']['u_golds']?></a></span></div>				         
						<div class="memberPostData"><?=$d['f_dateline']?></div>
					</div>



					<ul class="functionLine">
						<?php if(0){ ?>
						<li class="share"><a href="#share" onclick="fbshare('<?=SITE_URL.$d['feedurl']?>');return false;"><i class="fa fa-facebook-square"></i></a></li>
						<li class="favorite<?php if($d['uc_id']){?> add<?php } ?>" rel="<?=$fid?>"><a href="#favorite"><i class="fa fa-star"></i></a></li>
						<li class="report" fid="<?=$d['fid']?>"><a href="#report"><i class="fa fa-flag"></i></a></li>
						<?php }else{ ?>
						<li class="report morenmore">
							<a href="javascript: void(0)"><i class="fa fa-ellipsis-h"></i></a>
							<div class="reportDiv" style="display:none;">
								<ul>				 
									<li><a href="#"  onclick="fbshare('<?=SITE_URL.$d['feedurl']?>');$('.closeBox').click();return false;">分享到 facebook</a></li>
									<li class="favorite<?php if($d['uc_id']){?> add<?php } ?>"  rel="<?=$d['fid']?>"><a href="#">收藏</a></li>
									<li onclick="report_feed(<?=$d['fid']?>,0);return false;"><a href="#"><?=$lang[30]?></a></li>
									<li onclick="report_feed(<?=$d['fid']?>,1);return false;"><a href="#"><?=$lang[31]?></a></li>
									<?php if($_G['admin_id'] || $_G['uid']==$d['f_uid']||$_G['board_adminer']){ ?>
									<li onclick="open_post('article',<?=$d['fid']?>);return false;"><a href="#">編輯</a></li>
									<li onclick="del_post(<?=$d['fid']?>);return false;"><a href="#">刪除文章</a></li>
									<?php } ?>
									<li class="editData"><a href="editData.php?fid=<?=$fid?>" class="fancybox.iframe" data-fancybox-type="iframe" rel="editData">編輯紀錄</a></li>
								</ul>
								<div class="closeBox"></div>
							</div>		
						</li>
						<?php } ?>
					</ul>
				</div>
			</div>
		</div>
		<?php } ?>
		<h1><?=$d['f_desc']?></h1>
		
		<ul class="functionLine2">
			<span class="memberInfo"><a href="member-<?=$d['f_uid']."-".$d['f_author_name']?>" class="name"><i class="fa fa-user" aria-hidden="true"></i> <?=$d['f_author_name']?></a></span>
			<span class="pv"><i class="fa fa-eye"></i><?=$lang[24]?> <?=$d['f_views']?></span>
			<span class="comments"><a href="<?=$d['feedurl']?>#comments" title="<?=$d['f_desc']?>"><i class="fa fa-comment"></i><?=$d['f_commentcount'];?> </a></span>
				 
			<ul class="functionLine">
				<?php if(0){ ?>
				<li class="share"><a href="#share" onclick="fbshare('<?=SITE_URL.$d['feedurl']?>');return false;"><i class="fa fa-facebook-square"></i></a></li>
				<li class="favorite<?php if($d['uc_id']){?> add<?php } ?>" rel="<?=$fid?>"><a href="#favorite"><i class="fa fa-star"></i></a></li>
				<li class="report" fid="<?=$d['fid']?>"><a href="#report"><i class="fa fa-flag"></i></a></li>
				<?php }else{ ?>
				<li class="report morenmore">
					<a href="javascript: void(0)"><i class="fa fa-ellipsis-h"></i></a>
					<div class="reportDiv" style="display:none;">
						<ul>
							<li><a href="#"  onclick="fbshare('<?=SITE_URL.$d['feedurl']?>');$('.closeBox').click();return false;">分享到 facebook</a></li>
							<li class="favorite<?php if($d['uc_id']){?> add<?php } ?>"  rel="<?=$d['fid']?>"><a href="#">收藏</a></li>
							<li onclick="report_feed(<?=$d['fid']?>,0);return false;"><a href="#"><?=$lang[30]?></a></li>
							<li onclick="report_feed(<?=$d['fid']?>,1);return false;"><a href="#"><?=$lang[31]?></a></li>
							<?php if($_G['admin_id'] || $_G['uid']==$d['f_uid']||$_G['board_adminer']){ ?>
							<li onclick="open_post('article',<?=$d['fid']?>);return false;"><a href="#">編輯</a></li>
							<li onclick="del_post(<?=$d['fid']?>);return false;"><a href="#">刪除</a></li>
							<?php } ?>
							<li class="editData"><a href="editData.php?fid=<?=$fid?>" class="fancybox.iframe" data-fancybox-type="iframe" rel="editData">編輯紀錄</a></li>
						</ul>
						<div class="closeBox"></div>
					</div>
				</li>
				<?php } ?>		
			</ul>
		</ul>

		<div class="w336Top" onclick="ga('send', 'event', '手機影片上方廣告', 'click');" >
	
		<?php if(1){ ?>
		<!-- /72915797/leaguefunny_m_article_300x250_T -->
		<div id='div-gpt-ad-1507198240073-0' style='height:250px; width:300px;margin:0 auto;'>
		<script>
		googletag.cmd.push(function() { googletag.display('div-gpt-ad-1507198240073-0'); });
		</script>
		</div>
		
		<?php }else{ ?>

		
			<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
			<!-- M版_單頁影片_上方_336x280 -->
			<ins class="adsbygoogle"
			     style="display:inline-block;width:336px;height:280px"
			     data-ad-client="ca-pub-8690992887535889"
			     data-ad-slot="5888970767"></ins>
			<script>
			(adsbygoogle = window.adsbygoogle || []).push({});
			</script>
		<?php } ?>
	
	</div>
	</div>

	<div id="contents" class="article_contents">
		<!--<p><div id="player-group"></div></p>-->
	</div>

	<?php require_once(THEMEPATH."m-comment_recommend.php");?>

<script src="https://cdnjs.cloudflare.com/ajax/libs/screenfull.js/3.3.2/screenfull.min.js"></script>>
<script>
var sources = <?php echo json_encode($d['f_attachment'], JSON_PRETTY_PRINT);?>;
var isMobile = 1;
</script>
<script src="js/m-video.js?<?=time()?>"></script>
<script type="text/javascript" src="https://ssl.sitemaji.com/ysm_league.js"></script>
<?php require_once(THEMEPATH."m-article_footer_script.php"); ?>