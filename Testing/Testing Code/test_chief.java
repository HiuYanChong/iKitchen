package test1;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

public class test_chief extends SeleneseTestCase {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		//selenium = new DefaultSelenium("localhost", 4444, "*firefox", "http://localhost:9000/");
		selenium = new DefaultSelenium("localhost", 4444, "*googlechrome", "http://localhost:9000/");
		selenium.start();
	}

	@Test
	public void testTest_chief() throws Exception {
		selenium.open("/");
		selenium.type("id=name", "test_chief");
		selenium.type("id=password", "test_chief");
		selenium.click("css=button.btn.btn-default");
		selenium.waitForPageToLoad("30000");
		selenium.click("css=a.btn.btn-default");
		selenium.waitForPageToLoad("30000");
		selenium.addSelection("id=waiting-list", "label=dish3");
		selenium.click("css=button.btn.btn-default");
		assertEquals("接单成功", selenium.getAlert());
		selenium.addSelection("id=waiting-list", "label=dish2");
		selenium.click("link=选项");
		selenium.click("css=div.col-md-6.body-main");
		selenium.click("css=button.btn.btn-default");
		assertEquals("接单成功", selenium.getAlert());
		selenium.click("link=选项");
		selenium.click("link=接单");
		selenium.waitForPageToLoad("30000");
		selenium.click("link=首页");
		selenium.waitForPageToLoad("30000");
		selenium.click("link=选项");
		selenium.click("link=登出");
		selenium.waitForPageToLoad("30000");
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
